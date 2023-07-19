import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const useConference = () => {
  const [data, setData] = useState();

  const getConferences = async () => {
    const { data } = await axios.get('/api/v1/conference-rooms');
    return data;
  };

  const { isLoading: conferenceLoading, error: conferenceError } = useQuery(
    'Conferences',
    getConferences,
    {
      onSuccess: (data) => setData(data),
    }
  );

  const deleteReservation = async (id) => {
    const { data } = await axios.delete(
      `/api/v1/conference-rooms/reservations/${id}`
    );
    return data;
  };

  const deleteConferenceReservation = useMutation(deleteReservation);

  return {
    data,
    conferenceLoading,
    conferenceError,
    deleteConferenceReservation,
  };
};

export default useConference;
