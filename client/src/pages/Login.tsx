import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import plus from "../assets/Plus.png";
import Button from "../components/Button";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const jsonData = JSON.stringify({
      username: username,
      password: password,
    });

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })   .then((response) => {
      if (response.ok) {
        // Login was successful, handle it accordingly (e.g., redirect)
        console.log("Success")
      } else {
        // Handle the error response
        response.json().then((data) => {
          setErrorMessage(data.error || 'An error occurred during login.');
        });
      }
    })
    .catch((error) => {
      console.error('Network error:', error);
      setErrorMessage('Network error');
    });
  };

  return (
    <div className="flex py-2 pt-40">
      <div className="flex-1">
        <img src={plus} className="" />
      </div>
      <div className="flex-1 justify-between gap-6 p-20">
        <div>{errorMessage}</div>
        <div className="items-center gap-3">
          <p className="text-categoryText md:text-base text-sm">Username:</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className="w-full bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm"
          />
        </div>
        <br />
        <div className="items-center gap-3">
          <p className="text-categoryText md:text-base text-sm">Password:</p>
          <a>
            <p className="text-categoryText md:text-base text-sm text-right text-blue-800">
              Forgot Password
            </p>
          </a>
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm"
          />
        </div>
        <br />
        <div className="flex flex-col items-center">
          <Button
            type={"submit"}
            text={"Log In"}
            bgColorCode={"green"}
            onClick={handleSubmit}
          />
          <a href="/register" className="p-2 text-blue-800">
            Register Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
