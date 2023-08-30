import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./TalentRegister.css";
import image from "../../assets/TalentRegister.png";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import Navbar from "../Navbar/Navbar";

function TalentRegister() {
  let navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();

    const name = event.target.elements.formBasicName.value;
    const email = event.target.elements.formBasicEmail.value;
    const password = event.target.elements.formBasicPassword.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await addDoc(collection(db, "talent"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
      console.log("Registration successful:", user);
      navigate('/talent-login')
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="user-registration">
      <div className="user-registration-image">
        <img
          src={image}
          alt="Registration Image"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="user-registration-form">
        <h2>Talent Registration</h2>
        <Form onSubmit={handleRegistration}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
    </>
  );
}

export default TalentRegister;
