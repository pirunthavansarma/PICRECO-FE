
// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// // import LandingPage from '../src/Components/LandingPage/LandingPage'; // Import LandingPage
// // // import About from '../src/Components/LandingPage/About';
// // import AuthForm from '../src/Components/Authentication/AuthForm';
// // import AdminDashboard from '../src/Components/Dashboards/AdminDashboard';
// // import PhotographerDashboard from '../src/Components/EventManagement/PhtographerDashboard'; // Spelling fixed
// // import EventPage from '../src/Components/EventManagement/Eventpage';
// // import PaymentPage from '../src/Components/Payment/Payment';
// // import PhotoUpload from '../src/Components/EventManagement/photoUpload'; // Ensure proper case
// // import UserManagement from '../src/Components/Dashboards/UserManagement'; // Import the new UserManagement component

// // import './App.css';


// // // PrivateRoute component handles redirection based on user role and subscription status
// // const PrivateRoute = ({ children, role }) => {
// //   const userRole = sessionStorage.getItem('userRole');
// //   const isSubscribed = sessionStorage.getItem('isSubscribed');

// //   // Redirect to login if user role doesn't match or not logged in
// //   if (!userRole || userRole !== role) {
// //     return <Navigate to="/auth" />;
// //   }

// //   // Redirect to payment page if user is not subscribed
// //   // if (role === 'user' && !isSubscribed) {
// //   //   return <Navigate to="/payment" />;
// //   // }

// //   return children;
// // };

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //       <Route path="/*" element={<LandingPage />} />
// //       <Route path="/auth" element={<AuthForm />} />
// //         <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
// //         <Route path="/admin-dashboard/users" element={<UserManagement />} /> {/* Add new route for UserManagement */}
// //         <Route path="/Eventpage" element={<PrivateRoute role="user"><EventPage /></PrivateRoute>} />
// //         <Route path="/payment" element={<PaymentPage />} />
// //         <Route path="/photographer-dashboard" element={<PrivateRoute role="user"><PhotographerDashboard /></PrivateRoute>} />
// //         <Route path="/upload-photos" element={<PrivateRoute role="user"><PhotoUpload /></PrivateRoute>} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import AuthForm from './Components/Authentication/AuthForm';
// import MainAdminDashboard from './Components/Dashboards/MainAdminDashbord';
// import UserManagement from './Components/Dashboards/UserManagement';
// import PaymentManagement from './Components/Dashboards/PaymentManagement';
// import EventPage from '../src/Components/EventManagement/Eventpage';
// import PaymentPage from '../src/Components/Payment/Payment';
// import PhotographerDashboard from '../src/Components/EventManagement/PhtographerDashboard'; 
// import PhotoUpload from '../src/Components/EventManagement/photoUpload'; // Ensure proper case
// import LandingPage from '../src/Components/LandingPage/LandingPage'; // Import LandingPage
// import FaceRecognition from '../src/Components/EventManagement/FaceReconation';


// import './App.css';


// const PrivateRoute = ({ children, role }) => {
//   const userRole = sessionStorage.getItem('userRole');
//   const isSubscribed = sessionStorage.getItem('isSubscribed');

//   if (!userRole || userRole !== role) {
//     return <Navigate to="/auth" />;
//   }

//   // if (userRole === 'user' && !isSubscribed) {
//   //   return <Navigate to="/payment" />;
//   // }

//   return children;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//        <Route path="/" element={<LandingPage />} />
//         <Route path="/auth" element={<AuthForm />} />
//         <Route path="/Eventpage" element={<PrivateRoute role="user"><EventPage /></PrivateRoute>} />
//         <Route path="/payment" element={<PrivateRoute role="user"><PaymentPage /></PrivateRoute>} />
//         <Route path="/photographer-dashboard" element={<PrivateRoute role="user"><PhotographerDashboard/></PrivateRoute>}/>
//         <Route path="/admin" element={<Navigate to="/admin-dashboard" />} />
//         <Route path="/photoupload" element={<PrivateRoute role="user"><PhotoUpload /></PrivateRoute>} />
//         <Route path="/admin-dashboard/" element={<PrivateRoute role="admin"><MainAdminDashboard /></PrivateRoute>} />
//          <Route path="/users" element={<PrivateRoute role="admin"><UserManagement /></PrivateRoute>} />
//          <Route path="/payments" element={<PrivateRoute role="admin"><PaymentManagement /></PrivateRoute>} />
//         <Route path='/FaceRecognition' element={<FaceRecognition/>}/>

//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthForm from './Components/Authentication/AuthForm';
import MainAdminDashboard from './Components/Dashboards/MainAdminDashbord';
import UserManagement from './Components/Dashboards/UserManagement';
import PaymentManagement from './Components/Dashboards/PaymentManagement';
import AdminSidebar from './Components/Dashboards/AdminSidebar';
import EventPage from '../src/Components/EventManagement/Eventpage';
import PaymentPage from '../src/Components/Payment/Payment';
import PhotographerDashboard from '../src/Components/EventManagement/PhtographerDashboard'; 
import PhotoUpload from '../src/Components/EventManagement/photoUpload'; // Ensure proper case
import LandingPage from '../src/Components/LandingPage/LandingPage'; // Import LandingPage
import FaceRecognition from '../src/Components/Client/FaceReconation';
import ClientPhotoView from '../src/Components/Client/ClientPhotoView';
import MyEvents from '../src/Components/EventManagement/MyEvents'

import './App.css';
import Plans from './Components/EventManagement/Plans';
import AboutPage from './Components/LandingPage/About';

const PrivateRoute = ({ children, role }) => {
  const userRole = sessionStorage.getItem('userRole');
  // const isSubscribed = sessionStorage.getItem('isSubscribed');

  if (!userRole || userRole !== role) {
    return <Navigate to="/auth" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/auth" element={<AuthForm />} />
        
                {/* photogrpher Routes */}

        <Route path="/Eventpage" element={<PrivateRoute role="user"><EventPage /></PrivateRoute>} />
        <Route path="/payment" element={<PrivateRoute role="user"><PaymentPage /></PrivateRoute>} />
        <Route path="/photographer-dashboard" element={<PrivateRoute role="user"><PhotographerDashboard /></PrivateRoute>} />
        <Route path="/photoupload" element={<PrivateRoute role="user"><PhotoUpload /></PrivateRoute>} />
        <Route path="/MyEvents" element={<PrivateRoute role="user"><MyEvents /></PrivateRoute>} />
        <Route path="/Plans" element={<PrivateRoute role="user"><Plans /></PrivateRoute>} />

              {/* Admin Redirect */}
        <Route path="/admin" element={<Navigate to="/admin-dashboard" />} />
        
        {/* Admin Dashboard with child routes */}
        <Route path="/AdminSidebar" element={<PrivateRoute role="admin"><AdminSidebar /></PrivateRoute>} />
        <Route path="/admin-dashboard/*" element={<PrivateRoute role="admin"><MainAdminDashboard /></PrivateRoute>} />
        <Route path="/users/*" element={<PrivateRoute role="admin"><UserManagement /></PrivateRoute>} />
        <Route path="/payment-Management/*" element={<PrivateRoute role="admin"><PaymentManagement /></PrivateRoute>} />


        {/* Face Recognition Route */}
        <Route path='/FaceRecognition' element={<FaceRecognition />} />
        <Route path="/client-photo-view" element={<ClientPhotoView />} />

      </Routes>
    </Router>
  );
}

export default App;
