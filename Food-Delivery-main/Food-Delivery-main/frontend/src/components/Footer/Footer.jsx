import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h1 className="logo-text">
            Yummy Express<span>.</span>
          </h1>
          <p>
            Discover delicious food from top restaurants near you. Fast
            delivery, fresh meals, and a smooth ordering experience — all in
            one place.
          </p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.twitter_icon} alt="twitter" />
            <img src={assets.linkedin_icon} alt="linkedin" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91 98765 43210</li>
            <li>support@yummyexpress.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        Copyright 2026 Yummy Express. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;