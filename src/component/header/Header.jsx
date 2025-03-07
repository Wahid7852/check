import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS file

const Header = () => {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false); // State for features dropdown

  const toggleFeaturesDropdown = () => {
    setIsFeaturesOpen(!isFeaturesOpen);
  };

  return (
    <header className="magical-header sticky-nav">
      <Link to="/" className="brand-logo">
        HealthBot
      </Link>
      <nav className="magical-nav">
        {/* Features Dropdown */}
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={toggleFeaturesDropdown}>
            Features ▼
          </button>
          {isFeaturesOpen && (
            <div className="dropdown-menu">
              <Link to="/fitbit" className="dropdown-item">
                Fitbit Integration
              </Link>
              <Link to="/symptom-analysis" className="dropdown-item">
                Symptom Analysis
              </Link>
              <Link to="/chatbot" className="dropdown-item">
                Chatbot
              </Link>
              {/* Add more features here as needed */}
            </div>
          )}
        </div>

        {/* Plans Link */}
        <Link to="/plans" className="nav-link">
          Plans
        </Link>

        {/* Get Started Button */}
        <Link to="/register" className="magical-btn">
          Get Started
        </Link>
      </nav>
    </header>
  );
};

export default Header;