import moment from 'moment';
import { useEffect, useState } from 'react';

const useDates = (initialDate) => {
  const [currentDate, setCurrentDate] = useState(moment(initialDate));
  const [formattedDate, setFormattedDate] = useState('');

  const handlePreviousDay = () => {
    setCurrentDate(moment(currentDate).subtract(1, 'day'));
  };

  const handleNextDay = () => {
    setCurrentDate(moment(currentDate).add(1, 'day'));
  };

  useEffect(() => {
    setFormattedDate(
      `${currentDate.format('MMMM DD')}, ${currentDate.format('dddd')}`
    );
  }, [currentDate]);

  return {
    currentDate,
    formattedDate,
    handleNextDay,
    handlePreviousDay,
    setCurrentDate,
  };
};

export default useDates;
