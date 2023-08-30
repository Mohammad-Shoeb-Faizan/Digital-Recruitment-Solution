import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import "./Greeting.css";
import { useNavigate } from "react-router-dom";
import jobsData from "./jobs.json";

const Greeting = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);

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

  useEffect(() => {
    const filtered = jobsData.jobsData.filter(
      (candidate) =>
        candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCandidates(filtered);
  }, [searchQuery]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="greeting-container">
      {currentUser ? (
        <>
          <div className="header">
            <h2 className="greeting-heading">Hello, {currentUser.username}</h2>
            <button className="signout-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>

          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by title or location"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>

          <div className="candidates-container">
            <h3 className="candidates-heading">Jobs For You:</h3>
            {filteredCandidates.length > 0 ? (
              <ul className="candidates-list">
                {filteredCandidates.map((candidate) => (
                  <li key={candidate.id} className="candidate-item">
                    <div className="candidate-details">
                      <h4 className="candidate-title">{candidate.title}</h4>
                      <p className="candidate-location">{candidate.location}</p>
                    </div>
                    <p className="portal-message">{candidate.portal_message}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No candidates found.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Greeting;
