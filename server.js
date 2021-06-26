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
  socket.on("data", (data) => {
    let ret = Object.assign({}, data, {
      frame: Buffer.from(data.frame, "base64").toString(),
    });
    console.log(ret);
    io.emit("image", ret);
  });
});
