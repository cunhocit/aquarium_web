/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('jwt_token') && localStorage.getItem('id_admin');
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;