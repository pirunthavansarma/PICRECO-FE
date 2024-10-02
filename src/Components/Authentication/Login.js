// import React, { useState } from "react";
// import axios from "axios";

// const Login = ({ onSuccess }) => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [responseMsg, setResponseMsg] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: '' });
//   };

//   const validate = () => {
//     let tempErrors = {};
//     if (!formData.email) tempErrors.email = "Email is required";
//     if (!formData.password) tempErrors.password = "Password is required";
//     return tempErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         const response = await axios.post('http://localhost:5001/api/users/login', formData);
//         setResponseMsg(response.data.message);
//         onSuccess(response.data.token, response.data.role);
//         const { token, role } = response.data;
//         sessionStorage.setItem('authToken', token);
//         sessionStorage.setItem('userRole', role);
//       } catch (error) {
//         if (error.response) {
//           setErrors({ api: error.response.data.message });
//         }
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Email"
//         style={{
//           marginBottom: '1rem',
//           padding: '0.8rem',
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//           width: '100%',
//         }}
//       />
//       {errors.email && <div style={{color: 'red'}}>{errors.email}</div>}
     
//       <input
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         placeholder="Password"
//         style={{
//           marginBottom: '1rem',
//           padding: '0.8rem',
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//           width: '100%',
//         }}
//       />
//       {errors.password && <div style={{color: 'red'}}>{errors.password}</div>}

//       <button
//         type="submit"
//         style={{
//           backgroundColor: '#6C4A4A',
//           color: '#EDEDED',
//           padding: '0.8rem 1.5rem',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//           width: '100%',
//           marginTop: '1rem',
//         }}
//       >
//         Login
//       </button>

//       {responseMsg && <div style={{color: 'green', marginTop: '1rem'}}>{responseMsg}</div>}
//       {errors.api && <div style={{color: 'red', marginTop: '1rem'}}>{errors.api}</div>}
//     </form>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";

const Login = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Send login request to the backend
        const response = await axios.post('http://localhost:5001/api/users/login', formData);

        // Assuming the response contains token, role, and email
        const { token, role } = response.data;

        // Set response message
        setResponseMsg(response.data.message);

        // Trigger onSuccess callback to pass token, role, and email without saving to sessionStorage
        onSuccess(token, role, formData.email);
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
        Login
      </button>

      {responseMsg && <div style={{color: 'green', marginTop: '1rem'}}>{responseMsg}</div>}
      {errors.api && <div style={{color: 'red', marginTop: '1rem'}}>{errors.api}</div>}
    </form>
  );
};

export default Login;
