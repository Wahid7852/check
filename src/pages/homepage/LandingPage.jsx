import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import Header from "../../component/header/Header";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleLoginChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("loginStatusChange", handleLoginChange);
    return () => window.removeEventListener("loginStatusChange", handleLoginChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("loginStatusChange"));
  };

  return (
    <div className="magical-landing">
    <Header />
      <section className="magical-hero">
        <h1 className="glowing-text">Your Magical Healthcare Assistant</h1>
        <p>Empowering you to take control of your health.</p>
        <a href="/chatbot" className="cta-glow">Start Chatting</a>
      </section>

      <section id="features" className="magical-features">
        <h2 className="section-title">Features</h2>
        <div className="features-grid">
          <Link to="/symptom-analysis" className="feature-card">
            <h3>💊 Symptom Analysis</h3>
            <p>AI-powered insights for your health symptoms.</p>
          </Link>
          <Link to="/appointment" className="feature-card">
            <h3>🩺 Appointment</h3>
            <p>Book with healthcare professionals.</p>
          </Link>
          <Link to="/report" className="feature-card">
            <h3>📄 Reports</h3>
            <p>Access health reports anytime.</p>
          </Link>
          <Link to="/fitbit" className="feature-card">
            <h3>💪 FitBit</h3>
            <p>Fitness insights in one place.</p>
          </Link>
        </div>
      </section>

      <footer className="magical-footer">
        <p>&copy; 2025 HealthBot Developed by Divyasai Ganti. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;