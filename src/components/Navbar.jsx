import React from 'react';

const TopNavbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Your Website</h1>
      <ul className="flex space-x-4">
        <li><a href="/home">Home</a></li>
        <li><a href="/feedback">Feedback</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
};

export default TopNavbar;
