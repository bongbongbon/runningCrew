// components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    alert('로그인이 필요한 페이지입니다.');
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
