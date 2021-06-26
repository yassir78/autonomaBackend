const express = require("express");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 3000;

const server = express().listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);
const io = socketIO(server);
io.on("connection", (socket) => {
  socket.on("disconnect", () => console.log("Client disconnected"));
  socket.on("speed", (message) => {
    io.emit("test", message.response);
  });
});
