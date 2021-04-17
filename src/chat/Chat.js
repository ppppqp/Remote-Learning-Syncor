import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { withStyles } from "@material-ui/core/styles";
import "./chat.css";
import "../common.css";
import Tooltip from "@material-ui/core/Tooltip";
const styles = {
  tooltip: {
    width: "700px",
    height: "100px",
    borderRadius: "5px",
    padding: "10px",
    boxShadow: "0 20px 80px 0",
    "font-size": "20px",
    // backgroundColor: "red",
  },
};

const CustomTooltip = withStyles(styles)(Tooltip);
export default function Chat({ userName, socket }) {
  const [messages, setMessages] = useState([]);
  let message = "";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      const messageObj = {
        text: message,
        user: userName,
        type: "chat",
      };
      if (message[0] === "?") {
        messageObj["type"] = "question";
        messageObj.text = messageObj.text.slice(1);
      }
      if (message[0] === "!") {
        messageObj["type"] = "answer";
        messageObj["target"] = parseInt(message[1]);
        messageObj.text = messageObj.text.slice(2);
      }
      socket.emit("chat message", messageObj);
      document.querySelector("#input").value = "";
      message = "";
    }
  };
  useEffect(() => {
    socket.on("chat message", function (msg) {
      setMessages([...messages, msg]);
      //https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
      window.scrollTo(0, document.body.scrollHeight);
    });
  }, [messages]);

  return (
    <div className="Chat-wrapper">
      <div className="messageField">
        <ul>
          {messages.map((m, i) => {
            let Id;
            if (m.type === "question") {
              Id = "Question ID" + m.id;
            } else if (m.type === "answer") {
              Id = "Answer to Question ID" + m.target;
            } else Id = null;
            return (
              <li key={m.id} className={m.type}>
                {" "}
                <div className="QuestionId">{Id}</div>
                <span className="userName">{m.user}</span>:{m.text}{" "}
              </li>
            );
          })}
        </ul>
      </div>
      <form className="chatForm" onSubmit={handleSubmit}>
        <label>
          <CustomTooltip title="Start with '?' to issue a question  Start with '![Question ID]' to answer">
            <input
              type="text"
              id="input"
              onChange={(e) => (message = e.target.value)}
              placeholder="enter your message here"
            />
          </CustomTooltip>
        </label>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}
