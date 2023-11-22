import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import FacebookIcon from "../icons/Facebook.png";
import InstagramIcon from "../icons/Instagram.png";
import TwitterIcon from "../icons/TwitterX.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-section left">
        <Link to="/faq" className="link"> {/* Use the Link component for internal navigation */}
          FAQ
        </Link>
      </div>
      <div className="footer-section center">
        
        <a href="https://www.instagram.com" className="icon" target="_blank" rel="noopener noreferrer">
          <img src={InstagramIcon} alt="Instagram" />
        </a>
        <a href="https://www.facebook.com" className="icon" target="_blank" rel="noopener noreferrer">
          <img src={FacebookIcon} alt="Facebook" />
        </a>
        <a href="https://www.twitter.com" className="icon" target="_blank" rel="noopener noreferrer">
          <img src={TwitterIcon} alt="Twitter" />
        </a>
      </div>
      <div className="footer-section right">
        <h1 className="text title">Support</h1>
        <p className="text email">support@gmail.com</p>
      </div>
    </div>
  );
};

export default Footer;
