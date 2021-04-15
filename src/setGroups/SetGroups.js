import React, { useEffect, useState } from "react";
import "./setGroups.css";
import io from "socket.io-client";
// const socketSetGroup = io("http://localhost:8080");
export default function SetGroups({
  userName,
  setGroup,
  setGroupReady,
  createdGroup,
  newID,
  socket,
}) {
  let roomNo = 0;
  let videoNo = "";
  let host = userName;
  console.log(createdGroup);
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
        <h4>To create a classroom, enter the lecture video name</h4>
        <h5>Eg: abcd.mp4</h5>
        <h5>
          Your room number is <span className="strong">{newID}</span>
        </h5>

        <form className="setGroupForm" onSubmit={handleCreate}>
          <input
            type="text"
            id="path"
            onChange={() => {
              let tmp = document.getElementById("path");
              videoNo = tmp.value;
              console.log(videoNo);
            }}
          />
          <div>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
      <div className="setGroupFrom2">
        <h4>Join a classroom</h4>
        <div className="available">
          <ul>
            Available classrooms:
            {createdGroup.map((g) => {
              return (
                <li>
                  Room No.<span className="strong">{g.roomNo}</span> Video No.{" "}
                  <span className="strong">{g.videoNo}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <form className="setGroupForm" onSubmit={handleJoin}>
          <input type="text" onChange={(e) => (roomNo = e.target.value)} />
          <button type="submit" className="btn btn-primary">
            Join
          </button>
        </form>
      </div>
    </div>
  );
}
