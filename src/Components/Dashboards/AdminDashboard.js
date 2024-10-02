
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [bestPlan, setBestPlan] = useState('');
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      fetchPayments(authToken);
      fetchUserCount(authToken);
    }
  }, []);

  const fetchPayments = async (token) => {
    try {
      const response = await axios.get('http://localhost:5001/api/payments/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const paymentsData = response.data.payments;
      setPayments(paymentsData);
      calculateBestPlan(paymentsData); // Calculate the best plan
      calculateTotalPayments(paymentsData); // Calculate the total payments
    } catch (error) {
      console.error('Error fetching payments', error);
    }
  };

  const fetchUserCount = async (token) => {
    try {
      const response = await axios.get('http://localhost:5001/api/users/admin-data', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && Array.isArray(response.data.users)) {
        setUserCount(response.data.users.length);
      } else {
        console.log('No users array found in response data');
      }
    } catch (error) {
      console.error('Error fetching user count', error);
    }
  };

  const calculateBestPlan = (payments) => {
    const planCount = {};

    payments.forEach(payment => {
      const planName = payment.planName;
      if (planName) {
        planCount[planName] = (planCount[planName] || 0) + 1;
      }
    });

    let maxCount = 0;
    let bestPlanName = '';

    for (const planName in planCount) {
      if (planCount[planName] > maxCount) {
        maxCount = planCount[planName];
        bestPlanName = planName;
      }
    }

    setBestPlan(bestPlanName);
  };

  const calculateTotalPayments = (payments) => {
    const total = payments.reduce((acc, payment) => acc + parseFloat(payment.planPrice || 0), 0);
    setTotalPayments(total.toFixed(2)); // Format to 2 decimal places
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome Admin</h1>
      </header>
      <section className="dashboard-stats">
        <div className="stat-card">
          <h2>Total Users</h2>
          <p>{userCount}</p> 
        </div>
        <div className="stat-card">
          <h2>Total Payments</h2>
          <p>${totalPayments}</p>
        </div>
        <div className="stat-card">
          <h2>Best Plan</h2>
          <p>{bestPlan}</p>
        </div>
      </section>
      <section className="payment-tracking">
        <h2>Recent Payments</h2>
        <ul>
          {payments.map(payment => (
            <li key={payment._id}>
              {payment.userEmail} - {payment.planName}: ${payment.planPrice} 
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
