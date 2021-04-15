import React, { useEffect, useState } from "react";
import Login from "./login/Login";
import "bootstrap/dist/css/bootstrap.css";
import io from "socket.io-client";
import "./App.css";
import SetGroups from "./setGroups/SetGroups";
import Video from "./video/Video";
import "./video/Video.css";
import WaitingRm from "./waitingRm/WaitingRm";

const socket = io("http://localhost:8080");
function App() {
  const [token, setToken] = useState();
  const [group, setGroup] = useState({ member: [] }); // initialize group to be empty list
  const [groupReady, setGroupReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [newID, setNewID] = useState(0);
  const [createdGroup, setCreatedGroup] = useState([]);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    socket.on("group change", function (newGroup) {
      setGroup(newGroup);
      console.log("new Group: ", newGroup);
    });
    socket.on("start room", () => setStarted(true));
    socket.on("create group", (createdGroup) => {
      setNewID(createdGroup.newID);
      setCreatedGroup(createdGroup.available);
    });
    socket.on("post question", function (msg) {
      setQuestions([...questions, msg]);
      // window.scrollTo(0, document.body.scrollHeight);
    });
  }, []);
  if (!token) {
    return <Login setToken={setToken} />;
  }

  if (!groupReady) {
    return (
      <SetGroups
        setGroup={(group) => {
          console.log(group);
          setGroup(group);
        }}
        socket={socket}
        createdGroup={createdGroup}
        newID={newID}
        setGroupReady={(value) => {
          console.log(value);
          console.log(groupReady);
          setGroupReady(value);
        }}
        userName={token.username}
      />
    );
  }

  if (!started) {
    return (
      <WaitingRm
        setStarted={setStarted}
        group={group}
        socket={socket}
        setGroup={setGroup}
        userName={token.username}
      />
    );
  }
  return (
    <div className="wrapper">
      <Video
        group={group}
        socket={socket}
        userName={token.username}
        questions={questions}
      />
      {/* <BrowserRouter>
        <Switch>
          <Route path="/SetGroups">
            
          </Route>
        </Switch>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
