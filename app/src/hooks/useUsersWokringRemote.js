import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const useUsersWorkingRemote = () => {
  const [data, setData] = useState();
  const getRemoteUsers = async () => {
    const { data } = await axios.get(`/api/v1/paid-time-off/remote-ptos-today`);
    return data;
  };

  const { isLoading, error } = useQuery('remoteUsers', getRemoteUsers, {
    onSuccess: (data) => setData(data),
  });

  return {
    remoteUsers: data,
    isLoading,
    error,
  };
};

export default useUsersWorkingRemote;
