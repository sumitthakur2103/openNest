import React from "react";
import "../styles/Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <h2 className="footer-logo">OpenNest</h2>
          <div className="footer-info">
            <p>
              <strong>Address:</strong>
              <br />
              Level 1, 12 Sample St, Sydney NSW 2000
            </p>
            <p>
              <strong>Contact:</strong>
              <br />
              1800 123 4567
              <br />
              <a href="mailto:info@opennest.com">info@opennest.com</a>
            </p>
          </div>
          <div className="footer-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaXTwitter />
            <FaLinkedinIn />
            <FaYoutube />
          </div>
        </div>

        <div className="footer-links">
          <div>
            <p>About Us</p>
            <p>Careers</p>
            <p>Contact Us</p>
            <p>FAQs</p>
            <p>Blog</p>
          </div>
          <div>
            <p>Support Center</p>
            <p>Community Guidelines</p>
            <p>Feedback</p>
            <p>Partnerships</p>
            <p>Sitemap</p>
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2025 Opennest. All rights reserved.</p>
        <div className="footer-bottom-links">
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Cookies Settings</p>
        </div>
      </div>
    </footer>
  );
}
