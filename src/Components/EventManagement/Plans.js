import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './Plans.css'; 

const Plans = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userEmail = sessionStorage.getItem('email'); // Get the email from session storage

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/payments/check-subscription-details/${userEmail}`);
        setSubscription(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError('Failed to fetch subscription');
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchSubscription();
    } else {
      setError('User email not found');
      setLoading(false);
    }
  }, [userEmail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="plans-container">
      <h1>Your Subscription Plan</h1>
      {subscription ? (
        <div className="subscription-details">
          <p><strong>Plan:</strong> {subscription.planName}</p>
          <p><strong>Price:</strong> {subscription.planPrice}</p>
          <p><strong>Status:</strong> {subscription.paymentStatus}</p>
          <p><strong>Valid Until:</strong> {new Date(subscription.validUntil).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>No subscription found.</p>
      )}
    </div>
  );
};

export default Plans;
