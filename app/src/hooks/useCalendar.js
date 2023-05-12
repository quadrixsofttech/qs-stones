import { useState } from 'react';

export const useCalendar = () => {
  const [listOfRanges, setListOfRanges] = useState([]);
  const [listOfRangesVacation,setListOfRangesVacation] = useState([]);

  const handleClose = (range) => {
    const index = listOfRanges.findIndex(r => r === range);
    if (index !== -1) {
      const newListOfRanges = [...listOfRanges];
      newListOfRanges.splice(index, 1);
      setListOfRanges(newListOfRanges);
    }
  }

  return [
    listOfRanges,
    setListOfRanges,
    listOfRangesVacation,
    setListOfRangesVacation,
    handleClose,
  ];
};
