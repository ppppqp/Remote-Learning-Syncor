import React, { useEffect, useState } from "react";
import io from "socket.io-client";

export default function WaitingRm({ group, userName, setStarted, setGroup }) {
  const [member, setMember] = useState();
  const socket = io("http://localhost:8080");
  console.log(group);
  // on component mount, fetch the current group
  // console.log(group);
  // socket.on("group change", async function (mem) {
  //   const newMember = member;
  //   newMember.push({ username: mem });
  //   console.log("newMember", newMember);
  //   setMember(newMember);
  // });
  return (
    <div className="setWaitingRm-wrapper">
      <h1>Please wait for everyone to join</h1>
      <ul>
        {group.member.map((g) => {
          return <li>{g.username}</li>;
        })}
      </ul>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setStarted(true)}
      >
        Start
      </button>
    </div>
  );
}
