import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BsFillBriefcaseFill } from "react-icons/bs";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className='flex gap-2'>
            <BsFillBriefcaseFill className='text-blue-600 text-3xl' />
            <Link to="/" className="text-2xl font-bold text-blue-600">
              HireHub
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to={`/${user.role}/dashboard`} className="text-gray-600 hover:text-blue-600">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-blue-600">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;