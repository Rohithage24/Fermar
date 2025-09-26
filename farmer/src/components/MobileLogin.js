import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MobileLogin.css"; // Link external CSS

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

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">OTP Login</h2>

        {!otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="login-input"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="login-button"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {otpSent && (
          <>
            <p className="login-message">{message}</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="login-input"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="login-button"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        <p className="login-message">{message}</p>
      </div>
    </div>
  );
};

export default MobileLogin;
