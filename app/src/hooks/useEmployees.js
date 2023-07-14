import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const useEmployees = () => {
  const [data, setData] = useState();

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

  const getPTO = async () => {
    const { data } = await axios.get(
      'https://645ca939250a246ae30a5bb8.mockapi.io/employees'
    );
    const filteredData = data.filter((x) => x.off === 'Pay Time Off');
    return filteredData;
  };

  const getRemote = async () => {
    const { data } = await axios.get(
      'https://645ca939250a246ae30a5bb8.mockapi.io/employees'
    );
    const filteredData = data.filter((x) => x.off === 'Remote');
    return filteredData;
  };

  const {
    isLoading: ptoLoading,
    error: ptoError,
    refetch: fetchPTO,
  } = useQuery('employeesPTO', getPTO, {
    onSuccess: (data) => setData(data),
    enabled: false,
  });

  const {
    isLoading: remoteLoading,
    error: remoteError,
    refetch: fetchRemote,
  } = useQuery('employeesRemote', getRemote, {
    onSuccess: (data) => setData(data),
    enabled: false,
  });

  return {
    data,
    ptoLoading,
    ptoError,
    fetchPTO,
    remoteLoading,
    remoteError,
    fetchRemote,
    createPTO,
  };
};

export default useEmployees;
