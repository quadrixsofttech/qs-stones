import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

const useReservations = (date) => {
  const [data, setData] = useState();

  const getReservations = async () => {
    const { data } = await axios.get(
      `/api/v1/conference-rooms/reservations/${date}`
    );
    return data;
  };

  const {
    isLoading: reservationsLoading,
    error: reservationsError,
    refetch: refetchReservations,
  } = useQuery('Reservations', getReservations, {
    onSuccess: (data) => setData(data),
  });

  return {
    reservationsData: data,
    refetchReservations,
    reservationsLoading,
    reservationsError,
  };
};

export default useReservations;
