import React, { createContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const startLocation = useLocation();

  const userInfo = localStorage.getItem('userInfo');
  const expiresAt = localStorage.getItem('expiresAt');

  const [authState, setAuthState] = useState({
    loading: true,
    startLocation,
    token: null,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('expiresAt', expiresAt);

    setAuthState((old) => ({
      ...old,
      token,
      userInfo,
      expiresAt,
    }));
  };

  const setToken = (token) => {
    setAuthState((old) => ({ ...old, token }));
  };

  const setLoading = (loading) => {
    setAuthState((old) => ({ ...old, loading }));
  };

  const setUserInfo = (callback) => {
    setAuthState((old) => ({ ...old, userInfo: callback(old.userInfo) }));
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('expiresAt');
    setAuthState((old) => ({
      token: null,
      expiresAt: null,
      userInfo: {},
    }));
    navigate('/login');
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  const isAdmin = () => {
    return authState.userInfo.role === 'admin';
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        setToken,
        setLoading,
        setUserInfo,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
