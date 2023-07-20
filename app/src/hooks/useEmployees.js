import { useQuery } from 'react-query';
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
  } = useQuery(['paid-time-off'], getPTO);

  return {
    data,
    isLoading,
    refetchPTO,
  };
};
export default useEmployees;
