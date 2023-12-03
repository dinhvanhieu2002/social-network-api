const Message = require("../models/Message");

module.exports = (io) => {
  let users = [];

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on("connection", (client) => {
    console.log("new connection");

    client.on("disconnect", () => {
      client.broadcast.emit("user disconnected");
      console.log("user disconnected");
      removeUser(client.id);
      io.emit("getUsers", users);
    });

    client.on("addUser", (userId) => {
      addUser(userId, client.id);
      io.emit("getUsers", users);
    });

    client.on("sendMessage", (data) => {
      const jsonData = JSON.parse(data);
      const user = getUser(jsonData['receivedId']);
      io.to(user?.socketId).emit("getMessage", data);
    });
    
  });
};
