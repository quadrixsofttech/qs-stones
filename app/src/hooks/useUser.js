import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FetchContext } from '../context/FetchContext';
import { publicFetch } from '../util/fetch';
import { useMutation } from 'react-query';


const useRegisterMutation = () => {
  const auth = useContext(AuthContext);

  const register = async ({ firstName, lastName, email, password }) => {
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

  const registerMutation = useMutation(register);

  return {
    mutateAsync: registerMutation.mutateAsync,
    isLoading: registerMutation.isLoading,
  };
};

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

  const registerMutation = useRegisterMutation();

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
    registerMutation,
    authenticate,
    setUserRole,
  };
};

export default useUser;
