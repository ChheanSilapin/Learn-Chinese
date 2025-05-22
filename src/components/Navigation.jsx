import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../style/Navigation.css";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">Learn Chinese</NavLink>
        </div>

        <button
          className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <ul className={`nav-list ${isMenuOpen ? "active" : ""}`}>
          <li>
            <NavLink
              to="/quizzes"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Quizzes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/video"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Video
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
