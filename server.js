require("dotenv").config({ path: "./config.env" });

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const jwt = require("jsonwebtoken");

const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const connectDb = require("./utilsServer/connectDb");
connectDb();

const { addUser, onlineUsers, removeUser, findConnectedUser } = require("./utilsServer/roomActions");
const { addChatUser, removeChatUser, findConnectedChatUser } = require("./utilsServer/chatRoomActions");
const {
  loadMessages,
  sendMsg,
  setMsgToUnread,
  deleteMsg
} = require("./utilsServer/messageActions");

const { likeOrUnlikePost } = require("./utilsServer/likeOrUnlikePost");

io.use((socket, next) => {
  if (socket.handshake.auth && socket.handshake.auth.token){
    jwt.verify(socket.handshake.auth.token, process.env.jwtSecret, function(err, decoded) {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      next();
    });
  }
  else {
    next(new Error('Authentication error'));
  }    
})
.on("connection", socket => {
  // var interval;

  socket.on("join", ({ userId }) => {
    addUser(userId, socket.id);

    // if(interval)
    //   clearInterval(interval);

    // interval = setInterval(() => {
    //   const connectedUsers = onlineUsers(userId);
    //   socket.emit("connectedUsers", {users: connectedUsers});
    // }, 10000);
    const connectedUsers = onlineUsers();
    io.emit('connectedUsers',{users: connectedUsers});
  });

  socket.on("joinChat", ({ userId }) => {
    addChatUser(userId, socket.id);
    const connectedUsers = onlineUsers();
    socket.emit('connectedUsers',{users: connectedUsers});
  });

  socket.on("likePost", async ({ postId, userId, like }) => {
    const {
      success,
      name,
      profilePicUrl,
      username,
      postByUserId,
      error
    } = await likeOrUnlikePost(postId, userId, like);

    if (success) {
      socket.emit("postLiked");

      // if (postByUserId !== userId) {
      //   const receiverSocket = findConnectedUser(postByUserId);

      //   if (receiverSocket && like) {
      //     // WHEN YOU WANT TO SEND DATA TO ONE PARTICULAR CLIENT
      //     io.to(receiverSocket.socketId).emit("newNotificationReceived", {
      //       name,
      //       profilePicUrl,
      //       username,
      //       postId
      //     });
      //   }
      // }
    }
  });

  socket.on("loadMessages", async ({ userId, messagesWith }) => {
    const { chat, error } = await loadMessages(userId, messagesWith);

    !error ? socket.emit("messagesLoaded", { chat }) : socket.emit("noChatFound");
  });

  socket.on("sendNewMsg", async ({ userId, msgSendToUserId, msg }) => {
    const { newMsg, error } = await sendMsg(userId, msgSendToUserId, msg);
    const receiverSocket1 = findConnectedUser(msgSendToUserId);
    const receiverSocket2 = findConnectedChatUser(msgSendToUserId);

    if (receiverSocket1) {
      // WHEN YOU WANT TO SEND MESSAGE TO A PARTICULAR SOCKET
      io.to(receiverSocket1.socketId).emit("newMsgReceived", { newMsg });
    }

    if(receiverSocket2){
      io.to(receiverSocket2.socketId).emit("newMsgReceived", { newMsg });
    }

    await setMsgToUnread(msgSendToUserId);

    !error && socket.emit("msgSent", { newMsg });
  });

  socket.on("deleteMsg", async ({ userId, messagesWith, messageId }) => {
    const { success } = await deleteMsg(userId, messagesWith, messageId);

    if (success) socket.emit("msgDeleted");
  });

  // socket.on("sendMsgFromNotification", async ({ userId, msgSendToUserId, msg }) => {
  //   const { newMsg, error } = await sendMsg(userId, msgSendToUserId, msg);
  //   const receiverSocket = findConnectedUser(msgSendToUserId);

  //   if (receiverSocket) {
  //     // WHEN YOU WANT TO SEND MESSAGE TO A PARTICULAR SOCKET
  //     io.to(receiverSocket.socketId).emit("newMsgReceived", { newMsg });
  //   }
  //   //
  //   else {
  //     await setMsgToUnread(msgSendToUserId);
  //   }

  //   !error && socket.emit("msgSentFromNotification");
  // });

  socket.on("disconnect", () => {
    // clearInterval(interval);
    removeChatUser(socket.id);
    var present = removeUser(socket.id);
    if(present === 1){
      const connectedUsers = onlineUsers();
      io.emit('connectedUsers',{users: connectedUsers});
    }
  });
});

nextApp.prepare().then(() => {
  app.use("/api/signup", require("./api/signup"));
  app.use("/api/auth", require("./api/auth"));
  app.use('/api/search',require("./api/search"));
  app.use("/api/posts",require('./api/posts'));
  app.use("/api/profile", require("./api/profile"));
  app.use("/api/notifications", require("./api/notifications"));
  app.use("/api/chats", require("./api/chats"));
  app.use("/api/reset", require("./api/reset"));

  //(files/pages) in nextJS are server side rendered, so without below line pages folder files won't work
  app.all("*", (req, res) => handle(req, res)); //allow nextJS to handle SSR

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Express server running on ${PORT}`);
  });
});
