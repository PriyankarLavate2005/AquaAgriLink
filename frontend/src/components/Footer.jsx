import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
          <h1>AquaAgriLink</h1>
          <p className="footer-tagline">Innovating Farming for a Sustainable Future</p>
        </div>

        {/* Contact Information */}
        <div className="footer-contact">
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:ayushkumar110903@gmail.com">aquaagrilink12@gmail.com</a>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+919693194437">+91-9693194437</a>
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a href="https://github.com/ayushchahat/Smart_Agro" target="_blank" rel="noopener noreferrer">
              Smart_Agro Repository
            </a>
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a href="https://www.linkedin.com/in/aquaagrilink" target="_blank" rel="noopener noreferrer">
              AquaAgriLink 
            </a>
          </p>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            © 2024 Smart Agro. All rights reserved. 🌾
            <span className="footer-note"> Happy Farming with AquaagriLink</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
