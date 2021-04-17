import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Login.css";
import Header from "../header/header";
async function loginUser(token) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  }).then((data) => data.json());
}
async function register(token) {
  return fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  }).then((data) => data.json());
}
export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [hint, setHint] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser({
      username,
      password,
    });
    if (res.status) setToken(res.token);
    else setHint("Username not exists!");
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await register({
      username,
      password,
    });
    if (res.status) setToken(res.token);
    else {
      setHint("Username already exists!");
    }
  };
  return (
    <div className="login-wrapper">
      <Header step={0} userName={""} />
      <div className="login-info">
        <div>
          To use SYNCOR, you need to register a username you want to display to
          others
        </div>
        <div>If you already have one, you can log in directly</div>
      </div>

      <form className="loginForm">
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <div>
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="btn btn-primary button-login"
          >
            Log in
          </button>
          <button
            type="submit"
            onClick={(e) => handleRegister(e)}
            className="btn btn-primary button-register"
          >
            Register
          </button>
        </div>
        <div className="hint"> {hint}</div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
