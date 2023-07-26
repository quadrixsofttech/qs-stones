import { useQuery } from 'react-query';
import axios from 'axios';
import useUser from '../hooks/useUser';

export const usePaidTimeOff = () => {
  const { user } = useUser();
  const userId = user._id;

  const paidTimeOffCallback = async () => {
    const response = await axios.get(`api/v1/paid-time-off/history/${userId}`);
    return response.data;
  };
  const {
    data: paidTimeOffHistory = [],
    isError,
    isLoading,
  } = useQuery('paidTimeOffHistory', paidTimeOffCallback);

  return { paidTimeOffHistory, isError, isLoading };
};