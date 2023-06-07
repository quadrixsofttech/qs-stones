import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const useConference = () => {
  const [data, setData] = useState();

  const getConferences = async () => {
    const { data } = await axios.get(
      'https://64804076f061e6ec4d48e5ce.mockapi.io/conference'
    );
    return data;
  };

  const { isLoading: conferenceLoading, error: conferenceError } = useQuery(
    'Conferences',
    getConferences,
    {
      onSuccess: (data) => setData(data),
    }
  );

  return {
    data,
    conferenceLoading,
    conferenceError,
  };
};

export default useConference;
