import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const res = await response.json();

      if (res.message === 'Username or password incorrect') {
        setError('Invalid email or password');
      } else {
        const { accessToken, role } = res;
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('email', email);
        navigate('/home');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-indigo-600 to-blue-500">
      <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-4">Welcome to Timely</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-white">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="form-input mt-1 block w-full rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-input mt-1 block w-full rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full transition duration-200">Login</button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/forget-password/email" className="text-blue-300 hover:text-blue-100">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
