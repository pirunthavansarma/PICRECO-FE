import React, { useState } from "react";
import axios from "axios";

const Register = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [errors, setErrors] = useState({});
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let tempErrors = {};
    
    // Name validation: only letters, no numbers or special characters
    if (!formData.name) {
      tempErrors.name = "Name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.name)) {
      tempErrors.name = "Name can only contain letters";
    }

    // Email validation
    if (!formData.email) {
      tempErrors.email = "Email is required";
    }

    // Password validation: check for minimum length, letters, numbers, and special characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      tempErrors.password = "Password must be at least 8 characters long, and include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5001/api/users/register', formData);
        setResponseMsg(response.data.message);
        onSuccess(response.data.token, response.data.role, formData.email);
      } catch (error) {
        if (error.response) {
          setErrors({ api: error.response.data.message });
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        style={{
          marginBottom: '1rem',
          padding: '0.8rem',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '100%',
        }}
      />
      {errors.name && <div style={{color: 'red'}}>{errors.name}</div>}
      
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        style={{
          marginBottom: '1rem',
          padding: '0.8rem',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '100%',
        }}
      />
      {errors.email && <div style={{color: 'red'}}>{errors.email}</div>}
     
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        style={{
          marginBottom: '1rem',
          padding: '0.8rem',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '100%',
        }}
      />
      {errors.password && <div style={{color: 'red'}}>{errors.password}</div>}

      <button
        type="submit"
        style={{
          backgroundColor: '#6C4A4A',
          color: '#EDEDED',
          padding: '0.8rem 1.5rem',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
          marginTop: '1rem',
        }}
      >
        Sign Up
      </button>

      {responseMsg && <div style={{color: 'green', marginTop: '1rem'}}>{responseMsg}</div>}
      {errors.api && <div style={{color: 'red', marginTop: '1rem'}}>{errors.api}</div>}
    </form>
  );
};

export default Register;
