import React from "react";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#babda0ff", // dark green
        color: "black",
        padding: "1.5rem",
        textAlign: "center",
        marginTop: "2rem",
      }}
    >
      <p style={{ margin: 0, fontSize: "1rem" }}>
        🌱 Farmer’s Portal | Empowering Farmers with Information
      </p>
      <p style={{ margin: "0.5rem 0 0", fontSize: "0.9rem", opacity: 0.8 }}>
        © {new Date().getFullYear()} All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;


// import React from "react";

// function Footer() {
//   return (
//     <footer
//       style={{
//         backgroundColor: "#166534", // dark green
//         color: "white",
//         padding: "1.5rem",
//         textAlign: "center",
//         marginTop: "2rem",
//       }}
//     >
//       <p style={{ margin: 0, fontSize: "1rem" }}>
//         🌱 Farmer’s Portal | Empowering Farmers with Information
//       </p>
//       <p style={{ margin: "0.5rem 0 0", fontSize: "0.9rem", opacity: 0.8 }}>
//         © {new Date().getFullYear()} All Rights Reserved
//       </p>
//     </footer>
//   );
// }

// export default Footer;
