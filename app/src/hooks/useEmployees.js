import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

const useEmployees = (type = 'vacation') => {
  const getPTO = async () => {
    const { data } = await axios.get(`/api/v1/paid-time-off/${type}`);
    return data;
  };

  const {
    data,
    isLoading,
    refetch: refetchPTO,
  } = useQuery(['paid-time-off'], getPTO);

  const createPTOCallback = async ({
    dates,
    type,
    status,
    userId,
    reviewerId,
    comment,
  }) => {
    const { data } = await axios.post('/api/v1/paid-time-off/', {
      dates,
      type,
      status,
      userId,
      reviewerId,
      comment,
    });
    return data;
  };

  const createPTO = useMutation(createPTOCallback, {
    onError: (error) => {
      return error.response?.data || 'An unknown error occurred';
    },
  });

  return {
    data,
    createPTO,
    isLoading,
    refetchPTO,
  };
};
export default useEmployees;
