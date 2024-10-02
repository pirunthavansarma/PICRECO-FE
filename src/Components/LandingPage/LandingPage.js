// LandingPage.js
import React from 'react';
import { Routes, Route,} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import LandingNav from '../LandingPage/LandingNav'; // Assuming you already have a LandingNav.js for the navbar

const LandingPage = () => {
  return (
    <div>
      <LandingNav /> {/* Navigation Bar */}
      
      {/* Routes for Home, About, and Contact pages */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route for Home */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default LandingPage;
