import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopNavbar = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role')

  // Function to handle logout
  const handleLogout = () => {
    // Clear access token from sessionStorage
    sessionStorage.removeItem('accessToken');
    // Redirect to login page
    navigate('/login');
  };

  // Get email from sessionStorage
  const userEmail = sessionStorage.getItem('email');

  return (
    <nav className="bg-gray-900 text-white py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Timely</h1>
      <div className="flex items-center space-x-4">
        {/* Display other navigation links */}
        {role === 'admin' ? (
            <ul className="flex space-x-4">
            <li><a href="/home">Home</a></li>
            <li><a href="/ViewTimeline">Timesheet</a></li>
          </ul>
        ) : (
          <ul className="flex space-x-4">
          <li><a href="/home">Home</a></li>
          <li><a href="/timesheet">Timesheet</a></li>
          <li><a href="/feedback">Feedback</a></li>
        </ul>
        )}
        
        {/* Display email and logout button */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-300">{userEmail}</span>
          <button onClick={handleLogout} className="text-gray-300 hover:text-white">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
