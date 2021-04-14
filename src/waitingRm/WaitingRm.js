import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./waitingRm.css";
export default function WaitingRm({ group, userName, setStarted, setGroup }) {
  const [member, setMember] = useState();
  const socket = io("http://localhost:8080");
  console.log(group);
  console.log(userName);
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
      <div className="header">Waiting Room</div>
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
