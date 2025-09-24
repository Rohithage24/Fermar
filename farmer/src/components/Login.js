import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // import your AuthContext

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [auth, setAuth] = useAuth(); // use AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!mobile || !password) {
      setMessage("⚠ Please enter mobile and password");
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

      // Update AuthContext
      setAuth(userData);

      // Optional: save in localStorage (already handled in AuthContext)
      // localStorage.setItem("auth", JSON.stringify(userData));

      navigate("/"); // redirect to home after login
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "❌ Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🌾 Farmer Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="📱 Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        {message && <p style={styles.errorMessage}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#1a1a1a",
  },
  card: {
    background: "#313131",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    width: "350px",
    textAlign: "center",
    color: "#FFE100",
  },
  title: { marginBottom: "20px", fontSize: "22px", fontWeight: "bold" },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #a7c957",
    background: "#1a1a1a",
    color: "#fff",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#FFE100",
    color: "#081c15",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  errorMessage: {
    marginTop: "10px",
    color: "#FF6B6B",
    fontWeight: "bold",
  },
};

export default Login;
