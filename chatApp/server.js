const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/temp.html");
});


io.on("connection", (socket) => {
  console.log("connection established");
  socket.on("updateChat", (msg) => {
    //console.log("hey")
    console.log(msg);
    io.emit("updateChat", msg);
  });
  //console.log(data)
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});


