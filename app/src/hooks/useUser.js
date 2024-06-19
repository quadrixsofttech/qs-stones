import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FetchContext } from '../context/FetchContext';
import { publicFetch } from '../util/fetch';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

const useUser = () => {
  const { protectedFetch } = useContext(FetchContext);
  const auth = useContext(AuthContext);
  const user = auth ? auth.authState.userInfo : { role: '' };

  const authenticateCallback = async ({ email, password }) => {
    const { data } = await publicFetch.post('authenticate', {
      email,
      password,
    });
    return data;
  };


  const registerCallback = async ({ firstName, lastName, email, password }) => {
    const { data } = await publicFetch.post(`signup`, {
      firstName,
      lastName,
      email,
      password,
    });
    return data;
  };

  const changePasswordCallBack = async ({ oldPassword, newPassword }) => {
    const { data } = await protectedFetch.patch('change-password', {
      id: user?._id,
      oldPassword,
      newPassword,
    });
    return data;
  };

  const changePassword = useMutation(changePasswordCallBack, {
    onSuccess: (data) => auth.setAuthState(data),
    onError: (error) => {
      return error.response?.data || 'Error in changeing the password';
    },
  });

  const authenticate = useMutation(authenticateCallback, {
    onSuccess: (data) => auth.setAuthState(data),
    onError: (error) => {
      return error.response?.data || 'An unknown error occurred';
    },
  });

  const register = useMutation(registerCallback, {
    onSuccess: (data) => auth.setAuthState(data),
    onError: (error) => {
      return error.response?.data || 'An unknown error occurred';
    },
  });

  const setUserRole = async (role, onSuccess, onError) => {
    try {
      const { data } = await protectedFetch.patch('user-role', {
        role,
      });
      auth.setUserInfo((old) => ({ ...old, role }));
      onSuccess(data);
    } catch (err) {
      onError(err.response.data);
    }
  };

  const getAdmins = async () => {
    const { data } = await axios.get('/api/v1/admins');
    return data;
  };

  const getEmployees = async () => {
    const { data } = await axios.get('/api/v1/employees');
    return data;
  };

  const deleteEmployeeCallback = async (id) => {
    const { data } = await axios.delete(`/api/v1/employees/${id}`);
    return data;
  };

  const {
    data: admins,
    isLoading: adminsLoading,
    error: adminsError,
  } = useQuery('admins', getAdmins);

  const {
    data: employees,
    isLoading: employeesLoading,
    error: employeesError,
    refetch: refetchEmployees,
  } = useQuery('employees', getEmployees);

  const deleteEmployee = useMutation(deleteEmployeeCallback);

  const getHolidays = async() => {
    const {data} = await axios.get('/api/v1/holidays');
    return data;
  }

  const {
    data: holidays,
    isLoading: holidaysLoading,
    error: holidaysError,
    refetch:refetchHolidays
  } = useQuery('holidays',getHolidays);

  return {
    user,
    register,
    registerIsLoading: register.isLoading,
    authenticate,
    authenticationLoading: authenticate.isLoading,
    setUserRole,
    admins,
    adminsLoading,
    adminsError,
    employees,
    employeesLoading,
    employeesError,
    refetchEmployees,
    deleteEmployee,
    changePassword,
    holidays,
    holidaysLoading,
    holidaysError,
    refetchHolidays
  };
};

export default useUser;
