

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSidebar.css'; 

const AdminSidebar = () => {
  const navigate = useNavigate();

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

  return (
    <aside className="Adminsidebar">
      <div className="logo">PICRECO</div>
      <nav>
        <ul>
          <li><button onClick={() => navigate('/admin-dashboard')}>Dashboard</button></li>
          <li><button onClick={() => navigate('/users')}>Users</button></li>
          <li><button onClick={() => navigate('/payment-Management')}>Payment Management</button></li>
          {/* <li><button onClick={() => navigate('/admin-dashboard/statistics')}>Statistics</button></li> */}
        </ul>
      </nav>
      <div className="settings">
        <button>Settings</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
