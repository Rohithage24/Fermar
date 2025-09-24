import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext"; // Auth context
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

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
        { withCredentials: true } // important if backend sets HTTP-only cookie
      );

      // Assuming your backend sends user and token
      const userData = {
        user: res.data.user,
        token: res.data.token || "", // optional if backend sends JWT
      };

      // Update AuthContext and localStorage
      setAuth({ ...auth, ...userData });
      localStorage.setItem("auth", JSON.stringify(userData));

      // Redirect to dashboard/admin
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleLogin} style={{ width: "350px", padding: "2rem", boxShadow: "0 0 10px #ccc", borderRadius: "8px" }}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#22c55e", color: "#fff", border: "none", borderRadius: "6px" }}>
          Login
        </button>
        {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
