import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Addproject from './AddProject';
import AllocateProjects from './AllocateProjects';
import RegisterUser from './register';
import TimeSheetParent from './Timesheet';
import TopNavbar from './Navbar';

function HomePage() {
  const [role, setRole] = useState(sessionStorage.getItem('role')); // Assume user is not an admin by default
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      // If role is not defined, redirect to the login page
      navigate('/login');
    }
  }, []);

  return (

    <div>
      <TopNavbar />

      {role === 'admin' && (
        <div>
          <h1>Welcome to the Home Page</h1>
          <h2>Hello Admin!</h2>
          <Addproject />
          <AllocateProjects />
          <RegisterUser />
        </div>
      )}
      {role === 'engineer' && (
        <div>
          <TimeSheetParent />
        </div>
      )}
    </div>

  );
}

export default HomePage;
