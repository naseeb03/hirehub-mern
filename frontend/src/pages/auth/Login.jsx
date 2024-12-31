import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';  // Import Axios

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'applicant',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form data
    if (formData.email && formData.password) {
      try {
        // Send login request to the backend API
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });

        // Assuming response contains the user data
        login({
          email: formData.email,
          role: formData.role,
          name: response.data.name,  // Replace with actual data from backend
        });

        // Navigate to the dashboard based on role
        navigate(`/${formData.role}/dashboard`);
      } catch (err) {
        if (err.response) {
          // Check the error status and message from the backend
          if (err.response.status === 401) {
            setError('Incorrect password. Please try again.');
          } else if (err.response.status === 404) {
            setError('User does not exist. Please register.');
          } else {
            setError('An unexpected error occurred. Please try again.');
          }
        } else {
          setError('Unable to connect to the server. Please try again later.');
        }
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login to HireHub</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="applicant">Applicant</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-600 hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
}

export default Login;
