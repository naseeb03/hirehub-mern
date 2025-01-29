import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}/dashboard`, { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.email && formData.password) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        const user = response.data;

        login({
          email: user.email,
          role: user.role,
          name: user.name,
          token: user.token,
          id: user._id,
        });

        navigate(`/${user.role}/dashboard`);
        toast.success('Logged in successfully!');
      } catch (err) {
        if (err.response) {
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default Login;
