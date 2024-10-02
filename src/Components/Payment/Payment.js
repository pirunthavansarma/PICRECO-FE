import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const PaymentPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem('email') || ''); 
  const [selectedPlanDetails, setSelectedPlanDetails] = useState({
    name: '',
    price: ''
  });
  const [subscriptionValid, setSubscriptionValid] = useState(null);
  const navigate = useNavigate();

  // Define PayPal plan IDs
  const plans = [
    { name: 'Pro', price: '16.58', storage: '100GB', planId: 'P-0LX228426N2348600M3QPB3Q' },
    { name: 'Ultra', price: '23.91', storage: '500GB', planId: 'P-96B71873BL392533MM3T4EPQ' },
    { name: 'Promax', price: '29.99', storage: '1TB', planId: 'P-7T418293BK647810LM3T46PQ' },
  ];

  useEffect(() => {
    // Immediately check sessionStorage for subscription validity on component mount
    const subscriptionValid = sessionStorage.getItem('subscriptionValid');
    if (subscriptionValid === 'true') {
      navigate('/photographer-dashboard'); // Navigate to PhotographerDashboard instantly
    }
  }, [navigate]);  // Ensure navigate is included in the dependency array

  useEffect(() => {
    // Ensure the user email is properly set
    if (!userEmail) {
      const email = sessionStorage.getItem('email');
      setUserEmail(email);
    }

    // Load PayPal SDK script dynamically
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=ARuLPQZ6fA9iKKCu-YyCrFX5OpGJj92bvhHXLFIADCr6q3IU9MM6ILvYhhyYlrJuuZZa5MDm3JRIlt5R&vault=true&intent=subscription';
    script.async = true;
    script.onload = () => setPaypalLoaded(true);
    document.body.appendChild(script);

    // Check subscription validity
    fetch(`${baseUrl}/api/payments/check-subscription/${userEmail}`)
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Subscription is valid') {
          setSubscriptionValid(true);
          sessionStorage.setItem('subscriptionValid', 'true');
          navigate('/photographer-dashboard');  // Navigate to dashboard if subscription is valid
        } else {
          setSubscriptionValid(false);
          sessionStorage.setItem('subscriptionValid', 'false');
        }
      })
      .catch(error => {
        console.error('Error checking subscription validity:', error);
        setSubscriptionValid(false);
        sessionStorage.setItem('subscriptionValid', 'false');
      });

    return () => {
      document.body.removeChild(script); // Clean up script on component unmount
    };
  }, [baseUrl, userEmail, navigate]);

  const renderPayPalButton = (planId) => {
    if (!paypalLoaded) return;

    // Remove previous PayPal button if exists
    const previousButton = document.getElementById('paypal-button-container');
    if (previousButton) {
      previousButton.innerHTML = '';
    }

    window.paypal.Buttons({
      style: {
        shape: 'pill',
        color: 'silver',
        layout: 'horizontal',
        label: 'subscribe'
      },
      createSubscription: function (data, actions) {
        return actions.subscription.create({
          plan_id: planId
        });
      },
      onApprove: function (data, actions) {
        const subscriptionID = data.subscriptionID;

        // Save subscription details in sessionStorage
        sessionStorage.setItem('subscriptionID', subscriptionID);
        sessionStorage.setItem('isSubscribed', 'true');
        sessionStorage.setItem('paymentStatus', 'paid');

        // Send subscription details to the backend
        fetch(`${baseUrl}/api/payments/create-subscription`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
          },
          body: JSON.stringify({
            userEmail,
            subscriptionID,
            planId,
            planName: selectedPlanDetails.name,
            planPrice: selectedPlanDetails.price,
            paymentStatus: 'paid',
          }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to save subscription details');
          }
          return response.json();
        })
        .then(data => {
          console.log('Backend response:', data);
          navigate('/photographer-dashboard'); // Navigate after successful subscription
        })
        .catch(error => {
          console.error('Error sending subscription details:', error);
          alert('There was an error processing your subscription. Please try again.');
        });
      },
      onError: function (err) {
        console.error('PayPal Error:', err);
        alert('There was an error with PayPal. Please try again.');
      }
    }).render('#paypal-button-container');
  };

  const handleSelectPlan = (plan) => {
    // Clear previous plan details from sessionStorage
    sessionStorage.removeItem('subscriptionID');
    sessionStorage.removeItem('paymentStatus');
    sessionStorage.removeItem('isSubscribed');

    // Set new plan details
    setSelectedPlan(plan.planId);
    setSelectedPlanDetails({
      name: plan.name,
      price: plan.price
    });

    // Automatically render and open the PayPal subscription modal
    renderPayPalButton(plan.planId);
    document.getElementById('paypal-button-container').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="payment-page">
      <h2>Select a Plan</h2>
      <div className="plans-container">
        {plans.map((plan, index) => (
          <div className="plan-card" key={index}>
            <h3>{plan.name}</h3>
            <p>${plan.price} per month</p>
            <p>{plan.storage} Storage</p>
            <button onClick={() => handleSelectPlan(plan)}>
              Select {plan.name}
            </button>
          </div>
        ))}
      </div>

      {/* Display selected plan details */}
      {selectedPlan && (
        <div className="selected-plan-details">
          <h3>Selected Plan</h3>
          <p><strong>Name:</strong> {selectedPlanDetails.name}</p>
          <p><strong>Price:</strong> ${selectedPlanDetails.price}</p>
        </div>
      )}

      {/* PayPal button container */}
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default PaymentPage;
