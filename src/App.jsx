import "./App.css";
import Contact from "./components/Contact/Contact";
import HomePage from "./components/HomePage/Homepage";
import { Routes, Route } from "react-router-dom";
import TalentRegister from "./components/Talent/TalentRegister";
import TalentLogin from "./components/Talent/TalentLogin";
import Greeting from "./components/Talent/Greeting";
import CompaniesRegister from "./components/Companies/CompaniesRegister";
import CompaniesLogin from "./components/Companies/CompaniesLogin";
import Portal from "./components/Companies/Portal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/talent-register" element={<TalentRegister />} />
        <Route path="/talent-login" element={<TalentLogin />} />
        <Route path="/company-register" element={<CompaniesRegister />} />
        <Route path="/company-login" element={<CompaniesLogin />} />
        <Route path="/greeting" element={<Greeting />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
