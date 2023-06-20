import moment from 'moment';
import { useState } from 'react';

const useDates = (initialDate) => {
  const [currentDate, setCurrentDate] = useState(moment(initialDate));

  const handlePreviousDay = () => {
    setCurrentDate(moment(currentDate).subtract(1, 'day'));
  };

  const handleNextDay = () => {
    setCurrentDate(moment(currentDate).add(1, 'day'));
  };

  const getFormattedDate = () => {
    return `${currentDate.format('MMMM DD')}, ${currentDate.format('dddd')}`;
  };

  const handleDateChange = (value) => {
    setCurrentDate(moment(value));
  };

  return {
    currentDate,
    handleNextDay,
    handlePreviousDay,
    getFormattedDate,
    handleDateChange,
  };
};

export default useDates;
