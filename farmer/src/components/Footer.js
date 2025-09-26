import React from "react";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        {/* Main tagline/brand emphasis */}
        <p className="footer-tagline">
          🌱 AgroSanga | Empowering Farmers with AI-Powered Insights
        </p>

        {/* Navigation/Links Placeholder (Optional, uncomment if adding links) */}
        <div className="footer-links">
          <a href="/about" className="footer-link">About Us</a>
          <a href="/contact" className="footer-link">Contact</a>
          <a href="/privacy" className="footer-link">Privacy Policy</a>
        </div>
       

        {/* Copyright */}
        <p className="footer-copy">
          © {new Date().getFullYear()} AgroSanga. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;