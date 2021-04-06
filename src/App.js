import React, { useState } from "react";
import Login from "./login/Login";
import "bootstrap/dist/css/bootstrap.css";
import io from "socket.io-client";
import "./App.css";
import SetGroups from "./setGroups/SetGroups";
import Video from "./video/Video";
import WaitingRm from "./waitingRm/WaitingRm";

function App() {
  const [token, setToken] = useState();
  const [group, setGroup] = useState({ member: [] }); // initialize group to be empty list
  const [groupReady, setGroupReady] = useState(false);
  const [started, setStarted] = useState(false);
  const socket = io("http://localhost:8080");

  if (!token) {
    return <Login setToken={setToken} />;
  }
  socket.on("group change", function (newGroup) {
    setGroup(newGroup);
    console.log("new Group: ", newGroup);
  });
  if (!groupReady) {
    return (
      <SetGroups
        setGroup={(group) => {
          console.log(group);
          setGroup(group);
        }}
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
      <WaitingRm setStarted={setStarted} group={group} setGroup={setGroup} />
    );
  }
  return (
    <div className="wrapper">
      <h1>Application</h1>

      <Video />
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
