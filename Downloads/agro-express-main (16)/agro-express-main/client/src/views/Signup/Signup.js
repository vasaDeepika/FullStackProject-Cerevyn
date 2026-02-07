import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import Navbar from "./../../components/Navbar/Navbar";
import signupPng from "./images/signups.png";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("user" || "{}"));
    if (store?.name) {
      alert(" you already signup ");
      window.location.href = "/";
    }
  }, []);

  const signupHere = async () => {
    try {
      const response = await axios.post("/api/v1/signups", {
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        address: address,
      });

      if (response?.data?.success) {
        alert(response?.data?.message);
        // localStorage.setItem("user", JSON.stringify(response?.data?.data));
        window.location.href = "/login";
      } else {
        alert(response?.data?.message);
      }
      console.log(response);

      setName("");
      setEmail("");
      setPassword("");
      setAddress("");
      setMobile("");
    } catch (e) {
      console.log("Not working");
      alert("Not working");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mb-20">
      </div>
      <div className="flex justify-center    gap-x-[150px] flex-wrap ">
        <img
          src={signupPng}
          alt=""
          className="h-[460px]"
          style={{ filter: "drop-shadow(6px 2px 6px #4b1b1b)" }}
        />

        <div>
          <form className=" form-controls mx-auto  " action="">
            <p className="title">SignUp</p>
            <div className="input-field">
              <input
                required=""
                className="input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label className="label" for="input">
                Enter Name
              </label>
            </div>

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

            <div className="input-field">
              <input
                required=""
                className="input"
                type="number"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              />
              <label className="label" for="input">
                Enter Mobile
              </label>
            </div>

            <div className="input-field">
              <input
                required=""
                className="input"
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <label className="label" for="input">
                Enter Address
              </label>
            </div>

            <Link to="/login" className="no-underline text-blue-600">
              You have already account Login here !
            </Link>
            <button
              type="button"
              className="signup-btn bg-red-600"
              onClick={signupHere}
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
