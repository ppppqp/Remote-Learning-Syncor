import React, { useState } from "react";
import "./setGroups.css";
import io from "socket.io-client";

export default function SetGroups({ userName, setGroup, setGroupReady }) {
  let roomNo = 0;
  let videoNo = 0;
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
    setGroup(group);
    setGroupReady(true);

    // record the group in the database
  };
  const handleJoin = async (e) => {
    e.preventDefault();
    // const group = await fetch("http://localhost:8080/joinGroup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ userName: userName }),
    // }).then((data) => data.json());
    // console.log("join!");
    console.log("emit!");
    socket.emit("group change", userName);
    // setGroup(group);
    setGroupReady(true);
  };
  return (
    <div className="setGroup-wrapper">
      <h1>Create a group</h1>
      <form onSubmit={handleCreate}>
        You can create a classroom by No.257
        <label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => (videoNo = parseInt(e.target.value))}
          >
            <option selected>Select a lecture video</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
      <h1>Join a group</h1>
      <form onSubmit={handleJoin}>
        <input type="text" onChange={(e) => (roomNo = e.target.value)} />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}
