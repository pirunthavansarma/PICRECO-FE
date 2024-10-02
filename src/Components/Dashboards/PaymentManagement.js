

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PaymentManagement.css';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      fetchPayments(token);
    } else {
      console.warn('No authToken found, redirecting to /auth.');
      navigate('/auth'); // Redirect to auth if token is missing
    }
  }, [navigate]);

  useEffect(() => {
    if (filter) {
      const filtered = payments.filter(payment =>
        payment.userEmail.toLowerCase().includes(filter.toLowerCase()) ||
        payment.planName.toLowerCase().includes(filter.toLowerCase()) ||
        payment.paymentStatus.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredPayments(filtered);
    } else {
      setFilteredPayments(payments);
    }
  }, [filter, payments]);

  const fetchPayments = async (token) => {
    try {
      const response = await axios.get('http://localhost:5001/api/payments/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(response.data.payments);
      setFilteredPayments(response.data.payments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payments', error);
      if (error.response && error.response.status === 401) {
        // If the token is invalid, clear it and redirect to auth
        sessionStorage.removeItem('authToken');
        navigate('/auth');
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <div className="payment-management-container">
      <h1>Payment Management</h1>

      <input
        type="text"
        placeholder="Search by email, plan name, or status"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="payment-search"
      />

      {loading ? (
        <p>Loading payments...</p>
      ) : (
        <table className="payment-table">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Plan Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Valid Until</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(payment => (
              <tr key={payment._id}>
                <td>{payment.userEmail}</td>
                <td>{payment.planName}</td>
                <td>${payment.planPrice}</td>
                <td>{payment.paymentStatus}</td>
                <td>{new Date(payment.validUntil).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentManagement;
