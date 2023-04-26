import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FetchContext } from '../context/FetchContext';
import { publicFetch } from '../util/fetch';
import { useMutation } from '@tanstack/react-query';

const useUser = () => {
  const { protectedFetch } = useContext(FetchContext);
  const auth = useContext(AuthContext);
  const user = auth ? auth.authState.userInfo : { role: '' };

  const authenticate = ({ email, password }, onSuccess, onError) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await publicFetch.post(`authenticate`, {
          email,
          password,
        });
        auth.setAuthState(data);
        onSuccess && onSuccess(data);
        resolve(data);
      } catch (error) {
        onError && onError(error.message);
        reject(error);
      }
    });
  };
  const authenticateMutation = useMutation(authenticate);

  const {
    isLoading: isAuthenticating,
    isError: authenticationError,
    data: authenticationData,
    mutate: authenticationMutate,
  } = authenticateMutation;

  const register = async (
    { firstName, lastName, email, password },
    onSuccess,
    onError
  ) => {
    try {
      const { data } = await publicFetch.post(`signup`, {
        firstName,
        lastName,
        email,
        password,
      });
      auth.setAuthState(data);
      onSuccess(data);
    } catch (error) {
      onError(error.response);
    }
  };

  const setUserRole = async (role, onSuccess, onError) => {
    try {
      const { data } = await protectedFetch.patch('user-role', {
        role,
      });
      auth.setUserInfo((old) => ({ ...old, role }));
      onSuccess(data);
    } catch (err) {
      onError(err.response.data);
    }
  };

  return {
    user,
    authenticate,
    register,
    setUserRole,
    isAuthenticating,
    authenticationError,
    authenticationData,
    authenticationMutate,
  };
};

export default useUser;
