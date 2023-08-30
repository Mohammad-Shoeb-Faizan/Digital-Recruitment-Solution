import React from 'react';
import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            We are a leading digital recruitment solutions provider, dedicated to revolutionizing the hiring process for companies in the IT industry. Our platform offers a seamless and efficient experience, helping businesses find top talent and candidates discover exciting career opportunities.
          </p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>
            Phone: 123-456-7890<br />
            Email: info@Recruitment.com<br />
            Address: 123 Minds Space, Hyderabad, India
          </p>
        </div>
        <div className="footer-section">
          <h3>Useful Links</h3>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Digital Recruitment. All rights reserved.</p>
      </div>
      </div>
  );
};

export default Footer;
