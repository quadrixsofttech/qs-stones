import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const useAwayUsersCount = () => {
  const [data, setData] = useState();
  const getRemoteAndVacationUsers = async () => {
    const { data } = await axios.get(`/api/v1/paid-time-off/remote-and-vacation`);
    return data;
  };

  const { isLoading, error } = useQuery(
    'awayUsers',
    getRemoteAndVacationUsers,
    {
      onSuccess: (data) => setData(data),
    }
  );

  return {
    awayUsers: data,
    isLoading,
    error,
  };
};

export default useAwayUsersCount;
