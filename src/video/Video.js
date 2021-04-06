import React, { useState } from "react";
import Chat from "../chat/Chat";
async function submitGroup(groupMember) {
  return fetch("http://localhost:8080/submitGroup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(groupMember),
  }).then((data) => data.json());
}

export default function Video({ userName, setGroup, group }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const group = await submitGroup(group);
    // record the group in the database
  };

  return (
    <div className="setGroup-wrapper">
      This is a video.
      <Chat userName={userName} />
    </div>
  );
}
