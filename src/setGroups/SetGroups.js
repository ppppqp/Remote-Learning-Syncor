import React, { useState } from "react";
import "./setGroups.css";
import io from "socket.io-client";

export default function SetGroups({ userName, setGroup, setGroupReady }) {
  let roomNo = 0;
  let videoNo = "";
  let host = userName;
  const socket = io("http://localhost:8080");
  const handleCreate = async (e) => {
    e.preventDefault();
    const group = { roomNo: roomNo, videoNo: videoNo, host: host, member: [] };
    fetch("http://localhost:8080/createGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    });
    console.log(group);
    setGroup(group);
    setGroupReady(true);

    // record the group in the database
  };
  const handleJoin = async (e) => {
    e.preventDefault();
    console.log("emit!");
    socket.emit("group change", userName);
    setGroupReady(true);
  };
  return (
    <div className="setGroup-wrapper">
      <div className="header">Create or Join a Group</div>
      <div className="setGroupForm1">
        <h1>Create a classroom, Enter the name of your video</h1>
        <h5>Eg: abcd.mp4</h5>
        <form className="setGroupForm" onSubmit={handleCreate}>
          <input type="text" id="path" onChange={()=>{let tmp=document.getElementById("path");
    videoNo=tmp.value;console.log(videoNo)}}/>
          <div>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
      <h1>Join a group</h1>
      <form className="setGroupForm" onSubmit={handleJoin}>
        <input type="text" onChange={(e) => (roomNo = e.target.value)} />
        <button type="submit" className="btn btn-primary">
          Join
        </button>
      </form>
    </div>
  );
}
