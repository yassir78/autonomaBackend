const express = require("express");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 3000;
//creation d'une serveur express ecoutant sur le port 3000 
const server = express().listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);
//creation d'une instance socketIO
const io = socketIO(server);
io.on("connection", (socket) => {
  //deconnexion du client 
  socket.on("disconnect", () => console.log("Client disconnected"));
  //emit des infos de la vitesse
  socket.on("speed", (message) => {
    io.emit("test", message.response);
  });
  // emit des images de la camera 
  socket.on("data", (data) => {
    io.emit("image", data);
  });
  //emit des infos directionnelles
  socket.on("direction", (data) => {
    io.emit("turn", data);
  });
});
