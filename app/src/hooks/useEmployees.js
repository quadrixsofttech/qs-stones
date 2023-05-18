import { useQuery } from 'react-query';
import axios from 'axios';

const useEmployees = () => {
  const getEmployeesPTO = async () => {
    const { data } = await axios.get(
      'https://645ca939250a246ae30a5bb8.mockapi.io/employees'
    );
    const filteredData = data.filter((x) => x.off === 'Pay Time Off');
    return filteredData;
  };

  const getEmployeesRemote = async () => {
    const { data } = await axios.get(
      'https://645ca939250a246ae30a5bb8.mockapi.io/employees'
    );
    const filteredData = data.filter((x) => x.off === 'Remote');
    return filteredData;
  };

  const {
    data: employeesPTO,
    isLoading: employeesLoading,
    error: employeesPTOError,
  } = useQuery('employeesPTO', getEmployeesPTO);

  const {
    data: employeesRemote,
    isLoading: employeesRemoteLoading,
    error: employeesRemoteError,
  } = useQuery('employeesRemote', getEmployeesRemote);

  return {
    employeesPTO,
    employeesLoading,
    employeesPTOError,
    employeesRemote,
    employeesRemoteLoading,
    employeesRemoteError,
  };
};

export default useEmployees;
