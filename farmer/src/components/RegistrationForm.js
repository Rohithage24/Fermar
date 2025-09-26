import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/RegistrationForm.css";

const RegistrationForm = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    address: "",
    surveyNo: "",
    area: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && !/^\d*$/.test(value)) return; // only digits for mobile

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      // Validation
      if (!formData.name || !formData.mobile || !formData.password || !formData.address || !formData.surveyNo || !formData.area) {
        throw new Error("Please fill all required fields.");
      }
      if (formData.mobile.length !== 10) {
        throw new Error("Mobile number must be exactly 10 digits.");
      }
      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }

      // API call (update with your backend URL)
      const res = await axios.post("http://localhost:5000/register", formData);

      setMessage(res.data.msg || "Registration successful!");
      setMessageType("success");

      if (res.data.msg?.toLowerCase().includes("success")) {
        setTimeout(() => navigate("/login"), 1500);
      }

      // Reset form
      setFormData({
        name: "",
        mobile: "",
        password: "",
        address: "",
        surveyNo: "",
        area: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.msg || err.message || "Error registering user");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <main className="registration-card">
        {/* Header */}
        <div className="form-header">
          <div className="form-header-icon">🌱</div>
          <h1 className="form-header-title">Farmer Registration</h1>
          <p className="form-header-subtitle">
            Create your account to access AI-powered farming insights
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="form-body" autoComplete="off">
          
          {/* Name */}
          <div className="form-group">
            <label className="form-label">
              Full Name <span className="required-star">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label className="form-label">
              Mobile Number <span className="required-star">*</span>
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="form-input"
              placeholder="10-digit mobile number"
              maxLength="10"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">
              Password <span className="required-star">*</span>
            </label>
            <div className="form-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Create a password"
                minLength="6"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="form-group">
            <label className="form-label">
              Address <span className="required-star">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your address"
              rows="3"
              required
            />
          </div>

          {/* Survey No */}
          <div className="form-group">
            <label className="form-label">
              Farm Land Survey No <span className="required-star">*</span>
            </label>
            <input
              type="text"
              name="surveyNo"
              value={formData.surveyNo}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Survey Number"
              required
            />
          </div>

          {/* Area */}
          <div className="form-group">
            <label className="form-label">
              Area (in acres) <span className="required-star">*</span>
            </label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter farm area"
              min="0"
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Registering..." : "Create Account"}
          </button>

          {/* Messages */}
          {message && <p className={`message ${messageType}`}>{message}</p>}

          {/* Already signed up */}
          <p className="signin-text">
            Already have an account?{" "}
            <a href="/login" className="signin-link">
              Sign in
            </a>
          </p>
        </form>
      </main>
    </div>
  );
};

export default RegistrationForm;
