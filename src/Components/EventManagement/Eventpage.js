

import React, { useEffect } from 'react';
import { useNavigate , useLocation  } from 'react-router-dom';
import './Eventpage.css'; 
import logoImage from '../EventManagement/picrecofinal.png';



const EventPage = () => {
  const navigate = useNavigate();
  const location = useLocation();



  // Function to handle logout
  const handleLogout = () => {
    // Clear session storage and redirect to the login page
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('subscriptionValid');
    sessionStorage.removeItem('subscriptionID');
    sessionStorage.removeItem('isSubscribed');
    sessionStorage.removeItem('paymentStatus');
    
    // Assuming you're using React Router's `useNavigate` for navigation
    navigate('/auth');
};

  // Function to navigate to the event page
  const goToEvent = () => {
    navigate('/FaceRecognition');
  };

  // Function to navigate to the payment page when 'Go to Event Createplace' is clicked
  const goToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="EventPage">
      <header className="header">
        {/* Clicking on the logo will log the user out */}
        <img src={logoImage} alt="Logo" className="logo-img" />
        <nav className="navEvent">
          <button onClick={handleLogout}>Log Out</button>
        </nav>
      </header>

      <main>
        <section className="heroEvent">
          <h1>PICRECO AI PHOTOMANAGEMENT</h1>
          <p>Manage your event photos with ease.</p>
          <button className="watch-demo">Demo</button>
        </section>

        <section className="cards">
          <div className="card left">
            <h2>Find Your Event</h2>
            <button onClick={goToEvent}>Go to Event</button>
          </div>

          <div className="card right">
            <h2>Create Your Event</h2>
            {/* Updated button to navigate to the payment page */}
            <button onClick={goToPayment}>Go to Event Createplace</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EventPage;
