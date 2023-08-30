import React, { useState } from "react";
import { BiHome, BiUser, BiBuilding, BiEnvelope } from "react-icons/bi";
import logo from "../../assets/nav-logo.png";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isTalentDropdownOpen, setIsTalentDropdownOpen] = useState(false);
  const [isCompaniesDropdownOpen, setIsCompaniesDropdownOpen] = useState(false);
  let navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleTalentDropdown = () => {
    setIsTalentDropdownOpen(!isTalentDropdownOpen);
  };

  const toggleCompaniesDropdown = () => {
    setIsCompaniesDropdownOpen(!isCompaniesDropdownOpen);
  };

  return (
    <nav>
      <div className="navbar-container">
        <img src={logo} alt="logo" className="navbar-logo" />
        <ul className={`navbar-menu ${isNavOpen ? "open" : ""}`}>
          <li className="navbar-item" onClick={() => navigate("/")}>
            <span className="navbar-icon">
              <BiHome />
            </span>
            <span className="navbar-title">Home</span>
          </li>
          <li className={`navbar-item ${isTalentDropdownOpen ? "open" : ""}`}>
            <span className="navbar-icon">
              <BiUser />
            </span>
            <span className="navbar-title dropdown-toggle" onClick={toggleTalentDropdown}>Talent</span>
            <div className="dropdown">
              {isTalentDropdownOpen && (
                <ul className="dropdown-menu">
                  <li style={{margin: "10px 0", listStyle: 'none'}} onClick={() => navigate("/talent-register")}>Register</li>
                  <li style={{margin: "10px 0", listStyle: 'none'}} onClick={() => navigate("/talent-login")}>Login</li>
                </ul>
              )}
            </div>
          </li>
          <li className={`navbar-item ${isCompaniesDropdownOpen ? "open" : ""}`}>
            <span className="navbar-icon">
              <BiBuilding />
            </span>
            <span className="navbar-title dropdown-toggle" onClick={toggleCompaniesDropdown}>Companies</span>
            <div className="dropdown ">
              {isCompaniesDropdownOpen && (
                <ul className="dropdown-menu">
                  <li style={{margin: "10px 0", listStyle: 'none'}} onClick={() => navigate("/company-register")}>Register</li>
                  <li style={{margin: "10px 0", listStyle: 'none'}} onClick={() => navigate("/company-login")}>Login</li>
                </ul>
              )}
            </div>
          </li>
          <li className="navbar-item" onClick={() => navigate("/contact")}>
            <span className="navbar-icon">
              <BiEnvelope />
            </span>
            <span className="navbar-title">Contact</span>
          </li>
        </ul>
        <button className="navbar-toggle" onClick={toggleNav}>
          <span className="navbar-toggle-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
