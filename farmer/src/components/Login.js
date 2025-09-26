import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // ✅ correct hook import
import '../styles/Login.css'; // Make sure your CSS file exists

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [auth, setAuth] = useAuth(); // ✅ useAuth hook

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!mobile || !password) {
      setMessage("⚠ Please enter mobile and password");
      return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
      setMessage("⚠ Mobile number must be 10 digits");
      return;
    }

    setLoading(true);
    setMessage("");

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

      // Navigate to home/dashboard
      navigate("/");

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">🌾 Farmer Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="📱 Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        {message && <p className="login-error">{message}</p>}
        <p className="login-footer">
          Don't have an account? <a href="/registration">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext"; 


// const Login = () => {
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const [auth, setAuth] = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!mobile || !password) {
//       setMessage("⚠ Please enter mobile and password");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/login",
//         { mobile, password },
//         { withCredentials: true }
//       );

//       const userData = {
//         user: res.data.user,
//         token: res.data.token || "",
//       };

//       // Update AuthContext
//       setAuth(userData);

//       navigate("/"); 
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.msg || "❌ Login failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">🌾 Farmer Login</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="📱 Mobile Number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//             className="login-input"
//             required
//           />
//           <input
//             type="password"
//             placeholder="🔑 Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="login-input"
//             required
//           />
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//         {message && <p className="login-error">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Login;
