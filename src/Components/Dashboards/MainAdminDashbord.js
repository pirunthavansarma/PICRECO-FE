
// // import React from 'react';
// // import { Routes, Route, useLocation } from 'react-router-dom';
// // import AdminDashboard from './AdminDashboard';
// // import UserManagement from './UserManagement';
// // import AdminSidebar from './AdminSidebar';
// // import Payment from './PaymentManagement';

// // const MainAdminDashboard = () => {
// //   const location = useLocation();  // Get the current route

// //   // Conditionally render the sidebar only if not on the User Management page
// //   return (
// //     <div className="main-admin-dashboard">
// //       {/* Render Sidebar if not on '/users' */}
// //       {location.pathname !== '/' && <AdminSidebar />}
// //        {/* <AdminSidebar /> */}

// //       <div className={location.pathname === '/users' ? 'user-management-content' : 'admin-dashboard-content'}>
// //       {/* <div> */}
// //         <Routes>
// //           <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
// //           <Route path="/users/*" element={<UserManagement />} />
// //           <Route path="/Payment/*" element={<Payment />} />

// //         </Routes>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MainAdminDashboard;

// import React from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import AdminDashboard from './AdminDashboard';
// import UserManagement from './UserManagement';
// import AdminSidebar from './AdminSidebar';
// import Payment from './PaymentManagement';

// const MainAdminDashboard = () => {
//   const location = useLocation();  // Get the current route

//   return (
//     <div className="main-admin-dashboard">
//       {/* Render Sidebar if not on '/users' */}
//       {!location.pathname.includes('/users') && <AdminSidebar />}

//       <div className={location.pathname === '/users' ? 'user-management-content' : 'admin-dashboard-content'}>
//                     <Routes>
//                 <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
//                 <Route path="/users/*" element={<UserManagement />} />
//                 <Route path="/Payment/*" element={<Payment />} />
//               </Routes>
//       </div>
//     </div>
//   );
// };

// export default MainAdminDashboard;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard'; // Main admin dashboard page
import UserManagement from './UserManagement';
import PaymentManagement from './PaymentManagement';

const MainAdminDashboard = () => {
  return (
    <div className="admin-dashboard-wrapper">
      <AdminSidebar />
      <div className="admin-dashboard-content">
        <Routes>
          <Route path="/" element={<AdminDashboard />} /> {/* Default Dashboard Route */}
          <Route path="/users" element={<UserManagement />} /> {/* User Management Route */}
          <Route path="/payment-Management" element={<PaymentManagement />} /> {/* Payment Management Route */}
        </Routes>
      </div>
    </div>
  );
};

export default MainAdminDashboard;
