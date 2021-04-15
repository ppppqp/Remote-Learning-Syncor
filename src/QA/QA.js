import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./QA.css";
export default function QA({ userName, socket, questions }) {
  // const [messages, setMessages] = useState([]);
  const [selectedField, setSelectedField] = useState();
  let message = "";
  let answer = "";
  const selectQ = (e) => {
    e.preventDefault();
    setSelectedField(e.target.key);
  };
  const postQuestion = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      const questionObj = {
        text: message,
        user: userName,
        answer: [],
      };
      socket.emit("post question", questionObj);
      document.querySelector("#question").value = "";
      message = "";
    }
  };
  // const postAnswer = (e) => {
  //   e.preventDefault();
  //   if (answer.length > 0) {
  //     const questionObj = questions.filter((m) => {
  //       return m.id === selectedField;
  //     })[0];
  //     questionObj.answer.push(answer);
  //     const answerObj = {
  //       question: questionObj,
  //       id: selectedField,
  //     };
  //     socket.emit("post answer", answerObj);
  //     document.querySelector("#answer").value = "";
  //     answer = "";
  //   }
  // };
  console.log(questions);
  return (
    <div className="QA-wrapper">
      <div className="messageField">
        <ul>
          {questions[0].text}
          {questions.map((m) => (
            <li className="Question" onClick={() => selectQ()}>
              {" "}
              <span className="userName">{m.user}</span>:{m.text}{" "}
              {/* <form className="answerForm" onSubmit={postAnswer}>
                <label>
                  <input
                    type="text"
                    id="question"
                    onChange={(e) => (message = e.target.value)}
                    placeholder="enter your question here"
                  />
                </label>
                <button type="submit" className="btn btn-primary">
                  Issue a question
                </button>
              </form> */}
            </li>
          ))}
        </ul>
      </div>
      <form className="questionForm" onSubmit={postQuestion}>
        <label>
          <input
            type="text"
            id="question"
            onChange={(e) => (message = e.target.value)}
            placeholder="enter your question here"
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Issue a question
        </button>
      </form>
    </div>
  );
}
