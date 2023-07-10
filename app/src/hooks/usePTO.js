import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPaidTimeOffHistory = async () => {
  const response = await axios.get('api/v1/paid-time-off');
  const { workingToday, awayOrRemote, percentIncrease, percentDecrease } =
    response.data;

  return { workingToday, awayOrRemote, percentIncrease, percentDecrease };
};

export const PaidTimeOffCallback = () => {
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
