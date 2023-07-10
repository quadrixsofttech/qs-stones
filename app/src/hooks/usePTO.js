import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPaidTimeOffHistory = async () => {
  const response = await axios.get('api/v1/paid-time-off/history');
  return response.data;
};

export const usePaidTimeOff = () => {
  const {
    data: paidTimeOffHistory = [],
    isError,
    isLoading,
  } = useQuery('paidTimeOffHistory', fetchPaidTimeOffHistory);

  return [paidTimeOffHistory, isError, isLoading];
};
