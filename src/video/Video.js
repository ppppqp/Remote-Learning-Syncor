import React, { useState } from "react";
import Chat from "../chat/Chat";
import io from "socket.io-client";
import "./Video.css";

async function submitGroup(groupMember) {
  return fetch("http://localhost:8080/submitGroup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(groupMember),
  }).then((data) => data.json());
}
var path = "";
var re = 0;
export default function Video({ userName, setGroup, group }) {
  if (typeof group != "undefined") {
    console.log(group, "abc");
    path = group["videoNo"];
  }
  console.log(path);
  var socket = io("http://localhost:8080");

  socket.on("playvideo", () => {
    console.log("play");
    let a = document.getElementById("video");
    if (re == 0) {
      re = re + 1;
      a.src = path;
    }
    a.play();
    let b = document.getElementById("b");
    b.src = "./stopbutton.png";
  });
  socket.on("pausevideo", () => {
    console.log("play");
    let a = document.getElementById("video");
    a.pause();
    let b = document.getElementById("b");
    b.src = "./playbutton.png";
  });
  return (
    <div className="setGroup-wrapper" class="mainvideo">
      <header class="header">SYNCOR</header>
      <div class="videoplayer">
        <video width="100%" height="auto" id="video" src=""></video>
      </div>
      <img
        id="b"
        src="./playbutton.png"
        class="but"
        onMouseOver={(e) => {
          console.log("over");
        }}
        onClick={() => {
          console.log("imgclick");
          let a = document.getElementById("video");
          if (re == 0) {
            re = re + 1;
            a.src = path;
          }
          console.log(a);
          let b = document.getElementById("b");
          if (a != null) {
            if (a.paused) {
              b.src = "./stopbutton.png";
              socket.emit("playvideo");
            } else {
              b.src = "./playbutton.png";
              socket.emit("pausevideo");
            }
          }
        }}
      ></img>
      <Chat userName={userName} />
    </div>
  );
}
