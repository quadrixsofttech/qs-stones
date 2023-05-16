import { useQuery } from 'react-query';
import axios from 'axios';

const useEmployees = () => {
  const getEmployees = async () => {
    const { data } = await axios.get(
      'https://645ca939250a246ae30a5bb8.mockapi.io/employees'
    );
    return data;
  };

  const {
    data: employees,
    isLoading: employeesLoading,
    error: employeesError,
  } = useQuery('employees', getEmployees);

  return {
    employees,
    employeesLoading,
    employeesError,
  };
};

export default useEmployees;
