
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showPaidOnly, setShowPaidOnly] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5001/api/users/admin-data', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetch payment status for each user
        const usersWithPaymentStatus = await Promise.all(
          response.data.users.map(async (user) => {
            try {
              const paymentResponse = await axios.get(`http://localhost:5001/api/payments/check-subscription/${user.email}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return { ...user, isPaid: paymentResponse.data.message === 'Subscription is valid' };
            } catch (error) {
              console.error(`Error fetching payment status for ${user.email}:`, error);
              return { ...user, isPaid: false }; // Default to unpaid if there's an error
            }
          })
        );

        setUsers(usersWithPaymentStatus);
        setFilteredUsers(usersWithPaymentStatus);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleFilterChange = () => {
    setShowPaidOnly(!showPaidOnly);
    if (!showPaidOnly) {
      const paidPhotographers = users.filter(user => user.isPaid);
      setFilteredUsers(paidPhotographers);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const adminPassword = prompt('Please enter your password to confirm deletion:');
  
      if (!adminPassword) {
        alert('Password is required to delete a user.');
        return;
      }
  
      const token = sessionStorage.getItem('authToken');
      await axios.delete(`http://localhost:5001/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { password: adminPassword }
      });
  
      setUsers(users.filter(user => user._id !== userId));
      setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
  
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error: Incorrect password or failed to delete user.');
    }
  };

  const handleBlockToggle = async (userId, currentlyBlocked) => {
    const token = sessionStorage.getItem('authToken');
    const newBlockStatus = !currentlyBlocked;
  
    try {
      const response = await axios.put(`http://localhost:5001/api/users/${userId}`, { isBlocked: newBlockStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response:', response);
  
      const updatedUsers = users.map(user => 
        user._id === userId ? { ...user, isBlocked: newBlockStatus } : user
      );
      
      setUsers(updatedUsers);
      setFilteredUsers(showPaidOnly ? updatedUsers.filter(u => u.isPaid && u.role === 'photographer') : updatedUsers);
  
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error toggling user block status:', error);
      toast.error('Failed to toggle user block status.');
    }
  };

  return (
    <div className="user-management-container">
      <h1>User Management</h1>

      <label>
        <input
          type="checkbox"
          checked={showPaidOnly}
          onChange={handleFilterChange}
        />
        Show Paid Photographers Only
      </label>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Plan</th>
            <th>Payment Status</th>
            <th>Blocked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.planName}</td>
              <td>{user.isPaid ? 'Paid' : 'Unpaid'}</td>
              <td>{user.isBlocked ? 'Yes' : 'No'}</td>
              <td>
                {user.role !== 'admin' && (
                  <>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                    {user.isBlocked ? (
                      <button onClick={() => handleBlockToggle(user._id, user.isBlocked)}>Unblock</button>
                    ) : (
                      <button onClick={() => handleBlockToggle(user._id, user.isBlocked)}>Block</button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
