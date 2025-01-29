import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Home from '../pages/Home';

const RedirectRoute = () => {
  const { user } = useAuth();

  if (user) {
    return user.role === 'recruiter' ? (
      <Navigate to="/recruiter/dashboard" />
    ) : (
      <Navigate to="/applicant/dashboard" />
    );
  }

  return <Home />;
};

export default RedirectRoute;