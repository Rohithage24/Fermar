import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
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
            style={styles.input}
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
        <p>{message}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex", justifyContent: "center", alignItems: "center",
    height: "100vh", background: "#f4f4f9",
  },
  card: {
    background: "#fff", padding: "30px", borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)", width: "350px",
    textAlign: "center",
  },
  title: { marginBottom: "20px", fontSize: "22px" },
  input: {
    width: "100%", padding: "10px", marginBottom: "15px",
    borderRadius: "8px", border: "1px solid #ccc",
  },
  button: {
    width: "100%", padding: "10px", border: "none",
    borderRadius: "8px", background: "#4CAF50", color: "#fff",
    fontSize: "16px", cursor: "pointer",
  },
};

export default RegistrationForm;
