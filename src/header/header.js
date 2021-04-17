import { Box } from "@material-ui/core";
import React, { Component } from "react";
// import React, { useEffect, useState } from "react";
import "./header.css";
const text = [
  "Login or Register",
  "Create or Join",
  "Waiting Room",
  "Class Start",
];
class Header extends Component {
  state = {
    box: ["step", "step", "step", "step"],
  };
  componentDidMount() {
    const boxCpy = this.state.box;
    boxCpy[this.props.step] = "step highlight";
    this.setState({ box: boxCpy });
  }
  render() {
    return (
      <div className="header">
        {this.state.box.map((b, i) => (
          <div key={i} className={b}>
            {text[i]}
          </div>
        ))}
      </div>
    );
  }
}

export default Header;
