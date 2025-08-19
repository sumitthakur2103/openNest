import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import axios from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/Login.css";
import loginPage from "../assets/loginPage.jpg";
import GooeyNav from "../components/GooeyNav.jsx";

const items = [
  { label: "Login", value: "login" },
  { label: "Sign Up", value: "signup" },
];

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [toggle, setToggle] = useState("login");
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error("Error:", err.response?.data?.message || err.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", {
        name,
        email,
        password,
        phoneNumber,
      });
      setEmail("");
      setPassword("");
      setName("");
      setPhoneNumber("");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-image">
        <img src={loginPage} alt="Login" />
      </div>
      <div className="login-form-container">
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={toggle === "login" ? 0 : 1}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          onToggle={(value) => setToggle(value)}
        />
        <div className="toggle-container">
          {toggle === "login" ? (
            <div className="login-container">
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
              </form>
              {error && (
                <p
                  className="error-message"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "10px 0px",
                  }}
                >
                  {error}
                </p>
              )}
              <p
                className="signup-link"
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  padding: "10px 0px",
                  cursor: "pointer",
                  color: "#000",
                }}
              >
                Don't have an account?{" "}
                <span
                  onClick={() => setToggle("signup")}
                  style={{
                    color: "#541b27",
                    fontWeight: "bold",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Sign Up
                </span>
              </p>
            </div>
          ) : (
            <div className="signup-container">
              <form onSubmit={handleSignup}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button type="submit">Sign Up</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
