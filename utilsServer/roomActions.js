const users = [];

const addUser = (userId, socketId) => {
  const user = users.find(user => user.userId === userId);

  if (user && user.socketId === socketId) 
    return;

  if (user && user.socketId !== socketId) 
      removeUser(user.socketId);

  const newUser = { userId, socketId };

  users.push(newUser);
};

const onlineUsers = () => {
  return users;
}

const removeUser = socketId => {
  const indexOf = users.map(user => user.socketId).indexOf(socketId);

  if(indexOf === -1)
    return -1;
  else{
    users.splice(indexOf, 1);
    return 1;
  }
};

const findConnectedUser = userId => users.find(user => user.userId === userId);

module.exports = { addUser, onlineUsers, removeUser, findConnectedUser };
