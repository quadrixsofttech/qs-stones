import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useQuery } from 'react-query';
import { useContext } from 'react';

const useHolidays = () => {
  const auth = useContext(AuthContext);
  const user = auth ? auth.authState.userInfo : { role: '' };

  const getHolidays = async () => {
    const { data } = await axios.get('/api/v1/holidays');
    return data;
  };

  const {
    data: holidays,
    isLoading: holidaysLoading,
    error: holidaysError,
    refetch: refetchHolidays,
  } = useQuery('holidays', getHolidays, {
    enabled: !!user.role,
  });

  return {
    holidays,
    holidaysLoading,
    holidaysError,
    refetchHolidays,
  };
};

export default useHolidays;
