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
      navigation("/home")

    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setMessage("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>OTP Login</h2>

      {!otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button onClick={handleSendOtp} disabled={loading}>
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
          />
          <button onClick={handleVerifyOtp} disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      <p>{message}</p>
    </div>
  );
};

export default MobileLogin;



// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function MobileLogin() {
//   const [step, setStep] = useState(1); // 1: enter mobile, 2: enter OTP
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [userId, setUserId] = useState(null);

//   const backendUrl = "http://localhost:5000"; // change if your backend URL is different

//   // ---------- Send OTP ----------
//   const handleSendOtp = async () => {
//     if (!mobile) return toast.error("Enter mobile number!");
//     try {
//       setLoading(true);
//       const res = await axios.post(`${backendUrl}/send-otp`, { mobile });
//       setLoading(false);
//       toast.success(res.data.msg);
//       setUserId(res.data.userId);
//       setStep(2); // move to OTP input
//     } catch (err) {
//       setLoading(false);
//       toast.error(err.response?.data?.error || "Error sending OTP");
//     }
//   };

//   // ---------- Verify OTP ----------
//   const handleVerifyOtp = async () => {
//     if (!otp) return toast.error("Enter OTP!");
//     try {
//       setLoading(true);
//       const res = await axios.post(`${backendUrl}/verify-otp`, {
//         userId,
//         otp,
//       });
//       setLoading(false);
//       toast.success(res.data.msg);
//       console.log("Login success:", res.data);
//       // store token in localStorage if needed
//       localStorage.setItem("token", res.data.token);
//       setStep(1);
//       setMobile("");
//       setOtp("");
//     } catch (err) {
//       setLoading(false);
//       toast.error(err.response?.data?.error || err.response?.data?.msg || "Error verifying OTP");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
//       <h2>Login with Mobile OTP</h2>
//       {step === 1 && (
//         <div>
//           <input
//             type="text"
//             placeholder="Enter mobile number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//             style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
//           />
//           <button onClick={handleSendOtp} style={{ padding: "10px 20px" }}>
//             {loading ? "Sending OTP..." : "Send OTP"}
//           </button>
//         </div>
//       )}
//       {step === 2 && (
//         <div>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
//           />
//           <button onClick={handleVerifyOtp} style={{ padding: "10px 20px" }}>
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// }

// export default MobileLogin;



// import React, { useState } from "react";
// import axios from "axios";

// function MobileLogin() {
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1); // Step 1 = enter mobile, Step 2 = enter OTP
//   const [loading, setLoading] = useState(false);

//   // Send OTP
//   const sendOtp = async () => {
//     if (!mobile) return alert("Enter mobile number");
//     try {
//       setLoading(true);
//       await axios.post("http://localhost:5000/send-otp", { mobile });
//       setStep(2);
//       alert("OTP sent to your mobile number!");
//     } catch (err) {
//       alert(err.response?.data?.error || "Error sending OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Verify OTP
//   const verifyOtp = async () => {
//     if (!otp) return alert("Enter OTP");
//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:5000/verify-otp", { mobile, otp });
//       if (res.data.success || res.data.token) {
//         localStorage.setItem("token", res.data.token); // Save JWT
//         alert("Login successful!");
//       } else {
//         alert("Invalid OTP");
//       }
//     } catch (err) {
//       alert(err.response?.data?.error || "Error verifying OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Mobile Login</h2>

//         {step === 1 ? (
//           <>
//             <input
//               type="text"
//               placeholder="Enter mobile number"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               style={styles.input}
//             />
//             <button onClick={sendOtp} style={styles.button} disabled={loading}>
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </>
//         ) : (
//           <>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               style={styles.input}
//             />
//             <button onClick={verifyOtp} style={styles.button} disabled={loading}>
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: "flex", justifyContent: "center", alignItems: "center",
//     height: "100vh", background: "#f4f4f9",
//   },
//   card: {
//     background: "#fff", padding: "30px", borderRadius: "12px",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)", width: "300px",
//     textAlign: "center",
//   },
//   title: { marginBottom: "20px", fontSize: "22px" },
//   input: {
//     width: "100%", padding: "10px", marginBottom: "15px",
//     borderRadius: "8px", border: "1px solid #ccc",
//   },
//   button: {
//     width: "100%", padding: "10px", border: "none",
//     borderRadius: "8px", background: "#4CAF50", color: "#fff",
//     fontSize: "16px", cursor: "pointer",
//   },
// };

// export default MobileLogin;
