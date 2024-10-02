import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import gifImage from './LandDemo.gif'; // Make sure this path is correct

const Home = () => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate('/auth'); // Redirect to Signup or any other page
  };

  return (
    <div className="homeContainer">
      {/* Background GIF */}
      <img src={gifImage} alt="background gif" className="backgroundGif" />

      {/* Overlay Content */}
      <div className="homeOverlay">
        <div className="homeContent">
          <h1 className="homeTitle">PICRECO</h1>
          <p className="homeSubtitle">Capture and Share Your Event Memories</p>
          <button className="joinNowBtn" onClick={handleJoinNow}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
