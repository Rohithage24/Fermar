import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!mobile || !password) {
      setMessage("Please enter mobile and password");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        { mobile, password },
        { withCredentials: true }
      );

      const userData = {
        user: res.data.user,
        token: res.data.token || "",
      };

      setAuth({ ...auth, ...userData });
      localStorage.setItem("auth", JSON.stringify(userData));
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Login failed");
    }
  };

  // Styles (from OTP example)
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "2rem",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    color: "#fff",
  };

  const headingStyle = {
    marginBottom: "1.5rem",
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#42ff73",
    textShadow: "0 0 8px rgba(66, 255, 115, 0.8)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    background: "rgba(255, 255, 255, 0.15)",
    color: "#fff",
    textAlign: "center",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    background: "linear-gradient(45deg, #42ff73, #00c6ff)",
    color: "#000",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    ...(hover && { transform: "scale(1.05)", boxShadow: "0 0 20px rgba(66, 255, 115, 0.8)" }),
  };

  const messageStyle = {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#ffdf5d",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleLogin} style={cardStyle}>
        <h2 style={headingStyle}>Login</h2>
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Login
        </button>
        {message && <p style={messageStyle}>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
