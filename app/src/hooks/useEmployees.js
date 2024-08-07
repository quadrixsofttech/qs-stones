import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

const useEmployees = (type) => {
  const getPTO = async () => {
    const { data } = await axios.get(`/api/v1/paid-time-off/${type}`);
    return data;
  };

  const {
    data,
    isLoading,
    refetch: refetchPTO,
  } = useQuery(['paid-time-off', type], getPTO);

  const createPTOCallback = async ({
    dates,
    type,
    status,
    userId,
    comment,
    reviewerId,
    paidLeaveType,
  }) => {
    const { data } = await axios.post('/api/v1/paid-time-off/', {
      dates,
      type,
      status,
      userId,
      comment,
      reviewerId,
      paidLeaveType,
    });
    return data;
  };

  const createPTO = useMutation(createPTOCallback, {
    onError: (error) => {
      return error.response?.data || 'An unknown error occurred';
    },
  });
  const updatePaidTimeOff = async (id, status, comment) => {
    try {
      const response = await axios.patch(`api/v1/paid-time-off`, {
        id,
        status,
        comment,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const approvePaidTimeOff = async (id, reviewerId) => {
    try {
      const response = await axios.patch(`api/v1/paid-time-off/approve`, {
        id,
        reviewerId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const rejectPaidTimeOff = async (id, comment, reviewerId) => {
    try {
      const response = await axios.patch(`api/v1/paid-time-off/reject`, {
        id,
        comment,
        reviewerId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    data,
    createPTO,
    isLoading,
    refetchPTO,
    updatePaidTimeOff,
    approvePaidTimeOff,
    rejectPaidTimeOff,
  };
};
export default useEmployees;
