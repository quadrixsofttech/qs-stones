import { useQuery } from 'react-query';
import axios from 'axios';

export const usePaidTimeOff = (employeeId) => {
  const paidTimeOffCallback = async () => {
    if (employeeId) {
      const response = await axios.get(
        `api/v1/paid-time-off/history/${employeeId}`
      );
      return response.data.reverse();
    } else {
      return [];
    }
  };
  const {
    data: paidTimeOffHistory = [],
    isError,
    isLoading,
    refetch: refetchPTO,
  } = useQuery('paidTimeOffHistory', paidTimeOffCallback);

  return { paidTimeOffHistory, isError, isLoading, refetchPTO };
};
