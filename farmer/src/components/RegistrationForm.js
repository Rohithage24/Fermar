import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    address: "",
    surveyNo: "",
    area: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", formData);
      setMessage(res.data.msg);
       if (res.data.msg.toLowerCase().includes("success")) {
        setTimeout(() => {
          navigate("/login");
        }, 1500); // wait 1.5s so user sees the message
      }
      setFormData({
        name: "",
        mobile: "",
        password: "",
        address: "",
        surveyNo: "",
        area: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error registering user");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Farmer Registration</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            style={{ ...styles.input, height: "70px" }}
            required
          />
          <input
            type="text"
            name="surveyNo"
            placeholder="Farm Land Survey No"
            value={formData.surveyNo}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="number"
            name="area"
            placeholder="Area (in acres)"
            value={formData.area}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        {message && (
          <p style={{ marginTop: "10px", color: "#4CAF50", fontWeight: "bold" }}>
            {message}
          </p>
        )}
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
  title: { marginBottom: "20px", fontSize: "22px" },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #a7c957",
    background: "#1a1a1a",
    color: "#fff",
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
};

export default RegistrationForm;
