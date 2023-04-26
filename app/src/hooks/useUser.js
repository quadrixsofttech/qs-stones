import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FetchContext } from '../context/FetchContext';
import { publicFetch } from '../util/fetch';
import { useMutation } from 'react-query';


const useUser = () => {
  const { protectedFetch } = useContext(FetchContext);
  const auth = useContext(AuthContext);
  const user = auth ? auth.authState.userInfo : { role: '' };

  const authenticate = async ({ email, password }, onSuccess, onError) => {
    try {
      const { data } = await publicFetch.post(`authenticate`, {
        email,
        password,
      });
      auth.setAuthState(data);
      onSuccess(data);
    } catch (error) {
      onError(error.response);
    }
  };

  const registerCallback = async ({ firstName, lastName, email, password }) => {
    try {
      const { data } = await publicFetch.post(`signup`, {
        firstName,
        lastName,
        email,
        password,
      });
      auth.setAuthState(data);
      return data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  const register = useMutation(registerCallback);

  const setUserRole = async (role) => {
    try {
      const { data } = await protectedFetch.patch('user-role', {
        role,
      });
      auth.setUserInfo((old) => ({ ...old, role }));
      return data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  return {
    user,
    register: register.mutateAsync,
    registerIsLoading: register.isLoading,
    authenticate,
    setUserRole,
  };
};

export default useUser;
