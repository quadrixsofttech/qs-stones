import { useQuery } from 'react-query';
import axios from 'axios';
import useUser from '../hooks/useUser';

export const usePaidTimeOff = (employeeId) => {
  const { user } = useUser();

  const userId = employeeId || user._id;

  const paidTimeOffCallback = async () => {
    const response = await axios.get(`api/v1/paid-time-off/history/${userId}`);
    return response.data.reverse();
  };
  const {
    data: paidTimeOffHistory = [],
    isError,
    isLoading,
    refetch: refetchPTO,
  } = useQuery('paidTimeOffHistory', paidTimeOffCallback);

  return { paidTimeOffHistory, isError, isLoading, refetchPTO };
};
