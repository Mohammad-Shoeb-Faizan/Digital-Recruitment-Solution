import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CompaniesLogin.css";
import image from "../../assets/CompaniesLogin.png";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Navbar from "../Navbar/Navbar";

function CompaniesLogin() {
  let navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target.elements.formBasicEmail.value;
    const password = event.target.elements.formBasicPassword.value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const usersRef = collection(db, "Companies");
      const querySnapshot = await getDocs(
        query(usersRef, where("uid", "==", user.uid))
      );

      if (querySnapshot.empty) {
        console.log("User does not exist in the 'companies' collection");
      } else {
        console.log("Login successful:", user);
        navigate("/portal");
      }
    } catch (error) {
      console.log("Login failed:", error);
      alert("Please Enter Valid Details!");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="seller-login">
      <div className="seller-login-image">
        <img src={image} alt="Seller Image" onClick={() => navigate("/")} />
      </div>
      <div className="seller-login-form">
        <h2>Company Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group controlId="formBasicCompany">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text" placeholder="Enter company name" />
          </Form.Group>

          <Form.Group controlId="formBasicAddress">
            <Form.Label>Company Address</Form.Label>
            <Form.Control type="text" placeholder="Enter company address" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
    </>
  );
}

export default CompaniesLogin;
