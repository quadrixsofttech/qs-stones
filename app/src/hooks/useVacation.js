import { useQuery } from 'react-query';
import axios from 'axios';

const useVacation = () => {
  const getVacationInfo = async () => {
    const { data } = await axios.get(
      'https://645ca939250a246ae30a5bb8.mockapi.io/vacation'
    );
    return data[0]; // Api bi trebao da vrati samo jedan obejcet.
  };

  const {
    data: vacationInfo,
    isLoading,
    error,
  } = useQuery('vacationInfo', getVacationInfo);

  return {
    vacationInfo,
    isLoading,
    error,
  };
};

export default useVacation;
