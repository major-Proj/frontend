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
    <div>
      {userRole === 'admin' ? ( 
        <div>
            <h1>Register New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select
            type="text"
            id="role"
            value={role}
            onChange={handleRoleChange}
            required
          >
            <option value="">select Role:</option>
            {roles.map(role => (
              <option  key={role} value={role}>{role}</option>
            ))} 
            </select>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Register</button>
      </form>
        </div>
      ) : (
        <p>You are not permitted to register new users.</p>
      )}
    </div>
  );
}

export default RegisterUser;
