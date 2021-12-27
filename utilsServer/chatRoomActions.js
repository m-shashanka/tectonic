const chatUsers = [];

const addChatUser = (userId, socketId) => {
  const user = chatUsers.find(user => user.userId === userId);

  if (user && user.socketId === socketId) 
    return;

  if (user && user.socketId !== socketId) 
      removeChatUser(user.socketId);

  const newUser = { userId, socketId };

  chatUsers.push(newUser);
};

const removeChatUser = socketId => {
  const indexOf = chatUsers.map(user => user.socketId).indexOf(socketId);

  if(indexOf === -1)
    return;

  chatUsers.splice(indexOf, 1);
};

const findConnectedChatUser = userId => chatUsers.find(user => user.userId === userId);

module.exports = { addChatUser, removeChatUser, findConnectedChatUser };