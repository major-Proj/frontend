import React, { useState,useEffect } from 'react';

function RegisterUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');

  const roles = [
    "admin",
    "engineer",
    "consultant"
  ]

  useEffect(() => {
    setUserRole(sessionStorage.getItem('role'));
    console.log(userRole);
  }, []);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {


      if (userRole !== 'admin') {
        throw new Error('Only admins can register new users');
      }

      const response = await fetch('http://localhost:5000/api/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({ first_name:firstName, last_name:lastName, role:role, email:email, password:password, phone_number:phoneNumber }),
      });

      const res = await response.json();

      console.log(res.message)
      if (res.message != "User created successfully") {
        alert("error in creating user");
      } else {
        alert("user created succussfully")
      }

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
  {userRole === 'admin' ? ( 
    <div>
      <h1 className="text-2xl font-bold mb-4">Register New User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="mb-1">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className="mb-1">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role" className="mb-1">Role:</label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select Role:</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))} 
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="mb-1">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Register</button>
      </form>
    </div>
  ) : (
    <p className="text-red-500">You are not permitted to register new users.</p>
  )}
</div>
  );
}

export default RegisterUser;
