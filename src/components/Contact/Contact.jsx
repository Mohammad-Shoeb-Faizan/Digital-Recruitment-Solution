import React, { useState } from 'react';
import "./Contact.css"
import Navbar from "../Navbar/Navbar"

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
    <Navbar/>
    <form className="form" onSubmit={handleSubmit}>
      <h2>CONTACT US</h2>
      <p>
        <input
          type="text"
          required
          placeholder="Write your name here.."
          value={name}
          onChange={handleNameChange}
        />
      </p>
      <p>
        <input
          type="email"
          required
          placeholder="Let us know how to contact you back.."
          value={email}
          onChange={handleEmailChange}
        />
      </p>
      <p>
        <input
          type="text"
          required
          placeholder="What would you like to tell us.."
          value={message}
          onChange={handleMessageChange}
        />
      </p>
      <button type="submit">Send Message</button>
      <div className="info">
        <span className="fa fa-phone"></span>001 1023 567
        <span className="fa fa-envelope-o"></span> contact@E-Shopee.com
      </div>
    </form>
    </>
  );
}

export default Contact;
