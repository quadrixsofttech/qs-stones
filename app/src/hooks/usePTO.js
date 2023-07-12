import { useQuery } from 'react-query';
import axios from 'axios';

const paidTimeOffCallback = async () => {
  const response = await axios.get('api/v1/paid-time-off/history');
  return response.data;
};

export const usePaidTimeOff = () => {
  const {
    data: paidTimeOffHistory = [],
    isError,
    isLoading,
  } = useQuery('paidTimeOffHistory', paidTimeOffCallback);

  return { paidTimeOffHistory, isError, isLoading };
};
