import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPaidTimeOffHistory = async () => {
  const response = await axios.get('/paid-time-off-history');
  return response.data;
};

const usePTO = () => {
  const {
    data: paidTimeOffHistory = [],
    isError,
    isLoading,
  } = useQuery('paidTimeOffHistory', fetchPaidTimeOffHistory);

  return {
    paidTimeOffHistory,
    isError,
    isLoading,
  };
};

export default usePTO;
