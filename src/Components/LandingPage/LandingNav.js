import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation for active link detection
import '../LandingPage/LandingNav.css'; // Ensure the CSS is imported
import logo from './picrecofinal.png'; // Adjust the path according to your folder structure

const LandingNav = () => {
  const location = useLocation(); // Use useLocation to get the current path

  return (
    <nav className="landing-nav">
      <div className="logo">
        <img src={logo} alt="Picreco Logo" />
      </div>
      <ul>
        <li>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default LandingNav;
