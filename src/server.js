const express = require("express");
const cors = require("cors");
const http = require("http");

const socketio = require("socket.io");
const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static(__dirname + "/waitingRm"));
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 8080;

let group = { member: [] };

io.on("connection", (socket) => {
  console.log("new connection");
  socket.on("group change", (member) => {
    group.member.push({ username: member });
    console.log(group);
    io.emit("group change", group);
  });
  socket.on("start room", () => {
    io.emit("start room");
  });
  socket.on("playvideo",()=>{
    io.emit("playvideo");
    console.log("abc")
  });
  socket.on("pausevideo",()=>{
    io.emit("pausevideo");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

app.use("/login", (req, res) => {
  res.send(req.body);
});

app.use("/createGroup", (req, res) => {
  group = req.body;
});
// app.use("/joinGroup", (req, res) => {
//   const member = req.body;
//   group.member.push(member);
//   res.send(group);
// });

app.use("/getGroup", (req, res) => {
  res.send(group);
});
server.listen(8080, () =>
  console.log("API is running on http://localhost:8080/login")
);
