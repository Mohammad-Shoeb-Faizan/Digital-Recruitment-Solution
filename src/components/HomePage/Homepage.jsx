import React, { useEffect, useRef } from "react";
import "./HomePage.css";
import { BiBriefcaseAlt, BiWorld } from "react-icons/bi";
import { FiUsers, FiSearch } from "react-icons/fi";
import { MdTimeline } from "react-icons/md";
import testimonialsData from "./Testimonials.json";
import hiredCandidatesData from "./hiredcandidates.json";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


const HomePage = () => {
  const testimonialsRef = useRef(null);
  const hiredPeopleRef = useRef(null);

  useEffect(() => {
    const scrollTestimonials = () => {
      testimonialsRef.current.scrollTo({
        left: testimonialsRef.current.scrollLeft + 1,
        behavior: "smooth",
      });
    };

    const scrollHiredPeople = () => {
      hiredPeopleRef.current.scrollTo({
        left: hiredPeopleRef.current.scrollLeft + 1,
        behavior: "smooth",
      });
    };

    const testimonialsInterval = setInterval(scrollTestimonials, 20);

    const hiredPeopleInterval = setInterval(scrollHiredPeople, 20);

    return () => {
      clearInterval(testimonialsInterval);
      clearInterval(hiredPeopleInterval);
    };
  }, []);

  return (
  <div className="body">
  <Navbar/>
    <div className="homepage-container">
      <div className="section about-us">
        <h2>About Us</h2>
        <p>
          We are a leading{" "}
          <span className="highlight">
            digital recruitment solutions provider
          </span>
          , dedicated to{" "}
          <span className="highlight">revolutionizing the hiring process</span>{" "}
          for companies in the <span className="highlight">IT industry</span>.
          Our platform offers a{" "}
          <span className="highlight">seamless and efficient experience</span>,
          helping businesses find <span className="highlight">top talent</span>{" "}
          and candidates discover{" "}
          <span className="highlight">exciting career opportunities</span>.
        </p>
      </div>

      <div className="section" style={{ color: "#333" }}>
        <h2>Services</h2>
        <div className="features-section">
          <div className="feature">
            <div className="icon-container">
              <BiBriefcaseAlt className="feature-icon" />
            </div>
            <h2>Efficient Hiring Process</h2>
            <p>Streamline your hiring process with our digital solution.</p>
          </div>

          <div className="feature">
            <div className="icon-container">
              <FiUsers className="feature-icon" />
            </div>
            <h2>Find Top Talent</h2>
            <p>Discover and attract the best candidates for your company.</p>
          </div>

          <div className="feature">
            <div className="icon-container">
              <FiSearch className="feature-icon" />
            </div>
            <h2>Advanced Candidate Search</h2>
            <p>
              Easily search and filter candidates based on location and job
              roles.
            </p>
          </div>

          <div className="feature">
            <div className="icon-container">
              <MdTimeline className="feature-icon" />
            </div>
            <h2>Data-Driven Insights</h2>
            <p>
              Access valuable data and analytics to make informed hiring
              decisions.
            </p>
          </div>
        </div>

        <div className="cta-section">
          <button className="cta-button">Start Hiring the Best Talent Today!</button>
        </div>
      </div>

      <div className="section">
        <h2>Testimonials</h2>
        <div className="testimonial-carousel" ref={testimonialsRef}>
          {testimonialsData.testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <img src={testimonial.image} alt={testimonial.name} />
              <h3>{testimonial.name}</h3>
              <span>{testimonial.company}</span>
              <p>{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Hired People</h2>
        <div className="hired-people-carousel" ref={hiredPeopleRef}>
          {hiredCandidatesData.hiredCandidates.map((candidate) => (
            <div className="hired-person-card" key={candidate.id}>
              <img src={candidate.image} alt={candidate.name} />
              <h3>{candidate.name}</h3>
              <span>{candidate.company}</span>
              <p>{candidate.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default HomePage;
