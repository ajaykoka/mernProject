import React, { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Registerform: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a payload object with the registration data
    const payload = {
      name,
      email,
      password,
    };

    try {
      // Make an HTTP POST request to the server-side API endpoint
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Handle the response
      if (response.ok) {
        // Registration successful, redirect or show a success message
        console.log('Registration successful');
      } else {
        // Registration failed, handle the error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleSubmit} // Call the handleSubmit function on button click
          >
            Register
          </button>
        </form>
        <div className="mt-8">
          <Link to="/signin">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Registerform;
