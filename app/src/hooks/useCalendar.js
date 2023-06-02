import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

export const useCalendar = () => {
  const [listOfRanges, setListOfRanges] = useState([]);
  const [listOfRangesVacation, setListOfRangesVacation] = useState([]);

  const handleClose = (range, isVacation = false) => {
    if (isVacation) {
      setListOfRangesVacation((prevList) =>
        prevList.filter((r) => r !== range)
      );
    } else {
      setListOfRanges((prevList) => prevList.filter((r) => r !== range));
    }
  };

  const fetchData = async () => {
    const response = await axios.get(
      'https://646329a24dca1a661355d68c.mockapi.io/users'
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery('users', fetchData);

  return [
    listOfRanges,
    setListOfRanges,
    listOfRangesVacation,
    setListOfRangesVacation,
    handleClose,
    data,
    isLoading,
    error,
  ];
};
