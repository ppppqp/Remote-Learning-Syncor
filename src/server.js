const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const userName = [];
let roomID = 0;
let messageID = 0,
  QuestionID = 0,
  AnswerID = 0;
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
const Question = [];
const PORT = process.env.PORT || 8080;

let group = { member: [] };
const groups = [];
io.on("connection", (socket) => {
  console.log("new connection");
  io.emit("create group", { available: groups, newID: roomID });
  socket.on("group change", (req) => {
    const member = req.member;
    const id = req.id;
    if (id < groups.length) groups[id].member.push({ username: member });
    io.emit("group change", groups[id]);
  });
  socket.on("start room", () => {
    io.emit("start room");
  });
  socket.on("playvideo", () => {
    io.emit("playvideo");
  });
  socket.on("pausevideo", () => {
    io.emit("pausevideo");
  });
  socket.on("chat message", (msg) => {
    const messageObj = msg;
    messageObj["id"] = messageID;
    io.emit("chat message", messageObj);
    messageID++;
  });
  socket.on("post question", (msg) => {
    Question.push(msg);
    msg["id"] = QuestionID;
    io.emit("post question", Question);
    QuestionID++;
  });
  socket.on("post answer", (msg) => {
    Question.push(msg);
    for (let m of Question) {
      if (m.id === msg.id) m = msg.question;
    }
    io.emit("post question", msg.question);
    AnswerID++;
  });
});

app.use("/login", (req, res) => {
  const token = req.body;
  const response = {
    token: token,
    status: true,
  };
  if (userName.indexOf(token.username) === -1) response.status = false;
  res.send(response);
});

app.use("/register", (req, res) => {
  const token = req.body;
  const response = {
    token: token,
    status: true,
  };
  if (userName.indexOf(token.username) !== -1) response.status = false;
  else userName.push(token.username);
  console.log(userName);
  res.send(response);
});
app.use("/createGroup", (req, res) => {
  group = req.body;
  group.roomNo = roomID;
  roomID++;
  groups.push(group);
  io.emit("create group", { available: groups, newID: roomID });
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
