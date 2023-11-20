import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const useVacation = (id) => {
  const [data, setData] = useState();
  const getVacationInfo = async () => {
    const { data } = await axios.get(`/api/v1/vacations/${id}`);
    return data;
  };

  const {
    isLoading,
    error,
    refetch: refetchVacationInfo,
  } = useQuery('vacationInfo', getVacationInfo, {
    onSuccess: (data) => setData(data),
  });

  return {
    vacationInfo: data,
    isLoading,
    error,
    refetchVacationInfo,
  };
};

export default useVacation;
