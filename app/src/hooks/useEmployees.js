import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const useEmployees = () => {
  const [data, setData] = useState();

  const getPTO = async (type) => {
    const { data } = await axios.get(`/api/v1/paid-time-off/${type}`);
    //setData(data);
    return data;
  };

  const { isLoading: ptoLoading, error: ptoError } = useQuery(
    'employeesPTO',
    getPTO,
    {
      onSuccess: (data) => {
        setData(data);
        console.log('On success');
      },
      enabled: true,
    }
  );

  return {
    data,
    ptoLoading,
    ptoError,
    getPTO,
  };
};

export default useEmployees;
