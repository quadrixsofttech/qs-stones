import { useQuery } from 'react-query';
import axios from 'axios';
import moment from 'moment';

export const usePaidTimeOff = (employeeId) => {
  const paidTimeOffCallback = async () => {
    if (employeeId) {
      const today = moment().format('YYYY-MM-DD');
      const response = await axios.get(
        `api/v1/paid-time-off/history/${employeeId}`
      );
      const remoteUsersToday = response.data.filter(
        (pto) =>
          typeof pto === 'object' &&
          pto.type === 'remote' &&
          pto.status === 'pending' &&
          Array.isArray(pto.dates) &&
          pto.dates.some((dateArray) => dateArray.includes(today))
      );
      // console.log(remoteUsersToday);

      return remoteUsersToday;
    } else {
      return [];
    }
  };
  const {
    data: paidTimeOffHistory = [],
    isError,
    isLoading,
    refetch: refetchPTO,
  } = useQuery('paidTimeOffHistory', paidTimeOffCallback);

  return { paidTimeOffHistory, isError, isLoading, refetchPTO };
};
