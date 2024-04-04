import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Addproject from './AddProject';
import AllocateProjects from './AllocateProjects';
import RegisterUser from './register';
import TopNavbar from './Navbar';
import Dashboard from './dashboard';

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

      {role === 'admin'?(
        <div className='bg-gradient-to-br from-purple-500 to-blue-500 h-full'>
          <TopNavbar/>
          <Addproject />
          <AllocateProjects />
          <RegisterUser />
        </div>
      ):
      (
        <div>
          <TopNavbar/>
          <Dashboard/>
        </div>
      )}
    </div>

  );
}

export default HomePage;
