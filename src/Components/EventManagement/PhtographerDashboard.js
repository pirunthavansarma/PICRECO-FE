import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PhotographerDashboard.css'; // Import a CSS file for styling

const PhotographerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check if the user is authenticated and subscription is valid
  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    const userRole = sessionStorage.getItem('userRole');
    const subscriptionValid = sessionStorage.getItem('subscriptionValid') === 'true'; // Check if subscription is valid

    if (!authToken || !userRole) {
      // If no token or user role, redirect to login page
      navigate('/auth');
    } else if (!subscriptionValid) {
      // If subscription is not valid, redirect to payment page
      navigate('/payment');
    } else if (location.state === null && location.pathname === '/dashboard') {
      // If user tries to access dashboard page directly by changing URL, redirect to login page
      navigate('/auth');
    }
  }, [navigate, location]);

  const handleLogout = () => {
    // Clear session storage and redirect to login page
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('subscriptionValid');
    sessionStorage.removeItem('subscriptionID');
    sessionStorage.removeItem('isSubscribed');
    sessionStorage.removeItem('paymentStatus');
    
    navigate('/auth');
  };

  const handleNavigation = (path) => {
    // Navigate to the selected page
    navigate(path);
  };

  return (
    <div className="dashboard-layout">
      {/* Custom Sidebar */}
      <div className="custom-sidebar">
        <div className="custom-sidebar-menu">
          <button onClick={() => handleNavigation('/PhotoUpload')}>
            Create Event
          </button>
          <button onClick={() => handleNavigation('/MyEvents')}>
            My Events
          </button>
          <button onClick={() => handleNavigation('/Plans')}>
            Plans
          </button>
          <button onClick={() => handleNavigation('/AssistMe')}>
            Assist Me
          </button>
        </div>
        {/* Bottom Section for Settings and Logout */}
        <div className="custom-sidebar-bottom">
          <button onClick={() => handleNavigation('/Settings')}>
            Settings
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Main content area */}
      <div className="main-content">
        <h1>Photographer Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>
    </div>
  );
};

export default PhotographerDashboard;
