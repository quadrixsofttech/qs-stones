import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

export const useCalendar = () => {
  const [listOfRanges, setListOfRanges] = useState([]);
  const [listOfRangesVacation, setListOfRangesVacation] = useState([]);

  const handleClose = (index, isRemote) => {
    console.log('react je super', index, isRemote);
    if (isRemote) {
      setListOfRanges((prevList) => {
        const updatedList = [...prevList];
        updatedList.splice(index, 1);
        return updatedList;
      });
    } else {
      setListOfRangesVacation((prevList) => {
        const updatedList = [...prevList];
        updatedList.splice(index, 1);
        console.log(updatedList);
        return updatedList;
      });
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
    isLoading,
    error,
    data,
  ];
};
