import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MobileLogin = () => {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const navigation = useNavigate();

  // Send OTP
  const handleSendOtp = async () => {
    if (!mobile) return alert("Enter mobile number");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/send-otp", { mobile });
      setUserId(res.data.userId);
      setOtpSent(true);
      setMessage(`OTP sent to ${mobile}`);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setMessage("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter OTP");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/verify-otp", {
        userId,
        otp,
      });
      setMessage(res.data.msg);
      console.log("JWT Token:", res.data.token);
      navigation("/home");
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setMessage("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", // dark gradient
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
    color: "#42ff73", // neon green
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
  };

  const buttonHover = {
    transform: "scale(1.05)",
    boxShadow: "0 0 20px rgba(66, 255, 115, 0.8)",
  };

  const messageStyle = {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#ffdf5d",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>OTP Login</h2>

        {!otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={inputStyle}
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              style={buttonStyle}
              onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
              onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {otpSent && (
          <>
            <p>{message}</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={inputStyle}
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              style={buttonStyle}
              onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
              onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        <p style={messageStyle}>{message}</p>
      </div>
    </div>
  );
};

export default MobileLogin;
