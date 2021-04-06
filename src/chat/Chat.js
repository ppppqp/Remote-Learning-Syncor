import React, { useState, useEffect } from "react";
import io from "socket.io-client";

export default function Chat({ userName }) {
  const [messages, setMessages] = useState([]);
  var socket = io("localhost:8080");
  let message = "";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      socket.emit("chat message", message);
      document.querySelector("#input").value = "";
      message = "";
    }
  };
  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    socket.on("chat message", function (msg) {
      // const newMessages = messages;
      // newMessages.push(msg);
      // // if (isMounted) {
      setMessages([...messages, msg]);
      console.log(messages);
      // }
      //https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
      // window.scrollTo(0, document.body.scrollHeight);
    });
  }, [messages]);

  return (
    <div className="setWaitingRm-wrapper">
      <div className="messageField">
        <ul>
          {messages.map((m, i) => (
            <li> {m} </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            id="input"
            onChange={(e) => (message = e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}
