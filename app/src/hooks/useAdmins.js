import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useQuery } from 'react-query';

const useAdmins = () => {
  const auth = useContext(AuthContext);
  const user = auth ? auth.authState.userInfo : { role: '' };

  const getAdmins = async () => {
    const { data } = await axios.get('/api/v1/admins');
    return data;
  };

  const {
    data: admins,
    isLoading: adminsLoading,
    error: adminsError,
  } = useQuery('admins', getAdmins, {
    enabled: !!user.role,
  });

  return {
    admins,
    adminsLoading,
    adminsError,
  };
};

export default useAdmins;
