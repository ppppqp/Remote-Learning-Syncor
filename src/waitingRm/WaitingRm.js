import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./waitingRm.css";
import Header from "../header/header";
// const socketWaitingRm = io("http://localhost:8080");
export default function WaitingRm({
  group,
  socket,
  userName,
  setStarted,
  setGroup,
}) {
  const button =
    group.host === userName ? (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          socket.emit("start room");
        }}
      >
        Start
      </button>
    ) : null;
  return (
    <div className="setWaitingRm-wrapper">
      <Header step={2} userName={""} />
      <div className="waitingList">
        <div>
          Host:
          <span className="strong">{group.host}</span>
        </div>
        <div>
          Room No.:
          <span className="strong">{group.roomNo}</span>
        </div>
        Joined Member:
        <ul>
          {group.member.map((g) => {
            return <li className="item">{g.username}</li>;
          })}
        </ul>
      </div>
      {button}
    </div>
  );
}
