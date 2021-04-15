import React, { useEffect, useState } from "react";
import Chat from "../chat/Chat";
import io from "socket.io-client";
import QA from "../QA/QA";
import "./Video.css";

var path = "";
var re = 0;

export default function Video({
  userName,
  setGroup,
  group,
  socket,
  questions,
}) {
  if (typeof group != "undefined") {
    console.log(group, "abc");
    path = group["videoNo"];
  }

  useEffect(() => {
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
  }, []);

  return (
    <div class="mainvideo">
      <header class="header">SYNCOR</header>
      <div className="video-wrapper">
        <div class="videoplayer">
          <video width="100%" height="auto" id="video" src=""></video>
        </div>
        <img
          id="b"
          src="./playbutton.png"
          class="but"
          onClick={() => {
            console.log("imgclick");
            let a = document.getElementById("video");
            if (re == 0) {
              re = re + 1;
              a.src = path;
            }
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
        <Chat userName={userName} socket={socket} />
      </div>
    </div>
  );
}
