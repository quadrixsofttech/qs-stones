import { useQuery } from 'react-query';
import axios from 'axios';
import { MyVacationInfoContext } from '../context/MyVacationInfoContext';
import { useContext } from 'react';

const useVacation = () => {
  const myVacationContext = useContext(MyVacationInfoContext);
  const getVacationInfo = async () => {
    const { data } = await axios.get(
      'https://645ca939250a246ae30a5bb8.mockapi.io/vacation'
    );
    return data[0]; // Api bi trebao da vrati samo jedan obejcet.
  };

  const { isLoading, error } = useQuery('vacationInfo', getVacationInfo, {
    onSuccess: (data) => myVacationContext.setVacationInfo(data),
  });

  return {
    vacationInfo: myVacationContext.myVacationInfoState,
    isLoading,
    error,
  };
};

export default useVacation;
