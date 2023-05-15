import { useState } from 'react';

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

  return [
    listOfRanges,
    setListOfRanges,
    listOfRangesVacation,
    setListOfRangesVacation,
    handleClose,
  ];
};
