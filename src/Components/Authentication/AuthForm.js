

// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import Login from "./Login";
// import Register from "./Register";
// import "./AuthForm.css";
// import SignUpImage from '../Authentication/login.png';  
// import SignInImage from '../Authentication/Signup.png'; 



// const AuthForm = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const navigate = useNavigate();

//   const handleToggleSignUp = () => setIsSignUp(true);
//   const handleToggleSignIn = () => setIsSignUp(false);

//   const handleLoginSuccess = (token, role) => {
//     sessionStorage.setItem('authToken', token);
//     sessionStorage.setItem('userRole', role);

//     if (role === 'admin') {
//       navigate('/admin');
//     } else {
//       navigate('/Eventpage');
//     }
//   };

//   return (
//     <div className={`main ${isSignUp ? "sign-up-mode" : ""}`}>
//       <div className="forms-container" id="forms-container">
//         <div className="signin-signup">
//           {isSignUp ? (
//             <Register onSuccess={handleLoginSuccess} />
//           ) : (
//             <Login onSuccess={handleLoginSuccess} />
//           )}
//         </div>
//       </div>

//       <div className="panels-container">
//         <div className="panel left-panel">
//           <div className="content">
//             <h3>New here?</h3>
//             <p>Sign up to explore our event photo management system!</p>
//             <button className="tooglebtn transparent" onClick={handleToggleSignUp}>
//               Sign Up
//             </button>
//           </div>
//           <img src={SignUpImage} className="image" alt="Sign In" />
//         </div>
//         <div className="panel right-panel">
//           <div className="content">
//             <h3>One of us?</h3>
//             <p>Sign in to continue accessing your event photos!</p>
//             <button className="tooglebtn transparent" onClick={handleToggleSignIn}>
//               Sign In
//             </button>
//           </div>
//           <img src={SignInImage} className="image" alt="Sign In" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import "./AuthForm.css";
import SignUpImage from '../Authentication/login.png';  
import SignInImage from '../Authentication/Signup.png'; 

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleToggleSignUp = () => setIsSignUp(true);
  const handleToggleSignIn = () => setIsSignUp(false);

  const handleLoginSuccess = (token, role, email, user_id) => {
    // Store auth token, role, email, and user_id in sessionStorage
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('userRole', role);
    sessionStorage.setItem('email', email);     
    // sessionStorage.setItem('user_id', user_id); // Store the user's ID

    // Navigate to appropriate page based on user role
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/Eventpage');
    }
  };

  return (
    <div className={`main ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="forms-container" id="forms-container">
        <div className="signin-signup">
          {isSignUp ? (
            <Register onSuccess={handleLoginSuccess} />
          ) : (
            <Login onSuccess={handleLoginSuccess} />
          )}
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Sign up to explore our event photo management system!</p>
            <button className="tooglebtn transparent" onClick={handleToggleSignUp}>
              Sign Up
            </button>
          </div>
          <img src={SignUpImage} className="image" alt="Sign In" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Sign in to continue accessing your event photos!</p>
            <button className="tooglebtn transparent" onClick={handleToggleSignIn}>
              Sign In
            </button>
          </div>
          <img src={SignInImage} className="image" alt="Sign In" />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
