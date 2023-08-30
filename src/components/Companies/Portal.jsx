import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import "./Portal.css";
import { useNavigate } from "react-router-dom";

const Portal = () => {
  const [currentUser, setCurrentUser] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const userEmail = user.email;
        const emailParts = userEmail.split("@");
        setCurrentUser({ email: userEmail, username: emailParts[0] });
      }
    };

    getCurrentUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <div className="greeting-container">
      {currentUser ? (
        <>
          <h2 className="greeting-title">Hello,</h2>
          <h2 className="greeting-username">{currentUser.username}</h2>
          <button className="greeting-logout-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
      <p>We will update you when your portal is ready.</p>
    </div>
  );
};

export default Portal;

