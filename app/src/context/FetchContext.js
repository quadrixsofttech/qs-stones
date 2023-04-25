import React, { createContext, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const protectedFetch = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  protectedFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!auth?.authState.token && auth?.authState.loading) {
      const getCsrfToken = async () => {
        try {
          const { data } = await protectedFetch.get("/csrf-token");
          axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
          auth.setToken(data.token);
          if (auth.authState.startLocation.pathname !== location.pathname) {
            navigate(auth.authState.startLocation);
          }
          auth.setLoading(false);
        } catch (error) {
          if (auth?.authState.loading) {
            auth.setLoading(false);
          }
        }
      };
      getCsrfToken();
    }
  }, [auth, protectedFetch, location, navigate]);

  return (
    <Provider
      value={{
        protectedFetch,
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
