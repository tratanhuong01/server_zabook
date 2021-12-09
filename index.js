var express = require("express");
const http = require("http");
var app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

socketIo.on("connection", (socket) => {
  ///Handle khi có connect từ client tới

  socket.on("chatMessage", (data) => {
    socketIo.emit(`receiveMessage.${data.id}`, {
      type: data.type,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(4444, () => {
  console.log("Server running port 4444");
});
