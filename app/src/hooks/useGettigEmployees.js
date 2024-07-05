import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useMutation, useQuery } from 'react-query';
import { useContext } from 'react';

const useGettingEmployees = () => {
  const auth = useContext(AuthContext);
  const user = auth ? auth.authState.userInfo : { role: '' };

  const getEmployees = async () => {
    const { data } = await axios.get('/api/v1/employees');
    return data;
  };

  const {
    data: employees,
    isLoading: employeesLoading,
    error: employeesError,
    refetch: refetchEmployees,
  } = useQuery('employees', getEmployees, {
    enabled: !!user.role,
  });

  const deleteEmployeeCallback = async (id) => {
    const { data } = await axios.delete(`/api/v1/employees/${id}`);
    return data;
  };

  const deleteEmployee = useMutation(deleteEmployeeCallback);

  return {
    employees,
    employeesLoading,
    employeesError,
    refetchEmployees,
    deleteEmployee,
  };
};

export default useGettingEmployees;
