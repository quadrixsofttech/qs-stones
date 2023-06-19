import moment from 'moment';
import { useState } from 'react';

const useDates = () => {
  const [currentDate, setCurrentDate] = useState(moment());

  const handlePreviousDay = () => {
    setCurrentDate(moment(currentDate).subtract(1, 'day'));
  };

  const handleNextDay = () => {
    setCurrentDate(moment(currentDate).add(1, 'day'));
  };

  const getFormattedDate = () => {
    return `${currentDate.format('MMMM DD')}, ${currentDate.format('dddd')}`;
  };

  return {
    handleNextDay,
    handlePreviousDay,
    getFormattedDate,
  };
};

export default useDates;
