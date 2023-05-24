require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const route = require("./routes/route");
const connectDB = require("./db/connect");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const socket = require("socket.io");

app.use(express.json());
app.use(cookieparser());
app.use(cors());
app.use(express.static("public"));
// app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log(req.file);
  res.render("home.ejs");
});

app.use("/", route);
// app.listen(8000, () => {
//   console.log("connected");
// });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    const server = app.listen(8000, () => {
      console.log("Server Started at port 8000");
    });
    chatServer(server);
  } catch (error) {
    console.log(error);
  }
};
start();

const chatServer = (server) => {
  const io = socket(server);

  // global.onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("connection established here");
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg received", data.msg);
      }
    });
    console.log("connection established");
    socket.on("updateChat", (data) => {
      //console.log("hey")
      console.log(data);
      io.emit("updateChat", data);
    });
  });
};
