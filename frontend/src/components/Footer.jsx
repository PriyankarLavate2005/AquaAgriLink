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
            <a href="mailto:sonalikarveerkarveer@gmail.com">sonalikarveerkarveer@gmail.com</a>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+919322983277">+91-9322983277</a>
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a href="https://github.com/PriyankarLavate2005/AquaAgriLink" target="_blank" rel="noopener noreferrer"> AquaAgriLink Repository </a>
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a href="https://www.linkedin.com/in/sonali-karveer-793774271/" target="_blank" rel="noopener noreferrer">
              AquaAgriLink 
            </a>
          </p>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            © 2026. All rights reserved. 🌾
            <span className="footer-note"> Happy Farming with AquaAgriLink </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
