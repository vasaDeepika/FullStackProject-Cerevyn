import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import loginPng from "./images/login.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("user" || "{}"));
    if (store?.name) {
      alert("You already login");
      window.location.href = "/";
    }
  }, []);

  const loginHere = async () => {
    const response = await axios.post("/api/v1/logins", {
      email: email,
      password: password,
    });
    if (response?.data?.success) {
      alert(response?.data?.message);
      localStorage.setItem("user", JSON.stringify(response?.data?.data));
      window.location.href = "/";

      setEmail("");
      setPassword("");
    } else {
      alert(response?.data?.message);
    }
    console.log(response);
  };

  return (
    <>
      <Navbar />
      <div className="mb-20">
      </div>
      <div className="flex justify-center    gap-x-20 flex-wrap ">
        <img
          src={loginPng}
          alt=""
          className="h-[460px]"
          style={{ filter: "drop-shadow(9px 4px 8px #4b1b1b)" }}
        />

        <div>
          <form className="form-control mx-auto " action="">
            <p className="title">Login</p>
            <div className="input-field">
              <input
                required=""
                className="input"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="label" for="input">
                Enter Email
              </label>
            </div>
            <div className="input-field">
              <input
                required=""
                className="input"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label className="label" for="input">
                Enter Password
              </label>
            </div>
            <Link to="/signup" className="no-underline text-blue-600">
              Create a new account !
            </Link>
            <button
              type="button"
              className="submit-btn bg-red-600"
              onClick={loginHere}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
