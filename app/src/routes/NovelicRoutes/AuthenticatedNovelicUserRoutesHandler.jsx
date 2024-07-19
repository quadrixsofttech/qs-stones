import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AuthenticatedNovelicUserRoutesHandler = () => {
  const auth = useContext(AuthContext);
  return auth.isAuthenticated() && auth.isNovelicUser() ? (
    <Outlet />
  ) : (
    <Navigate to="/conference" />
  );
};

export default AuthenticatedNovelicUserRoutesHandler;
