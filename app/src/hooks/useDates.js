import { useEffect, useState, useMemo } from 'react';

const useDates = (initialDate) => {
  const [currentDate, setCurrentDate] = useState(
    initialDate ? new Date(initialDate) : new Date()
  );
  const [formattedDate, setFormattedDate] = useState('');
  const options = useMemo(
    () => ({
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }),
    []
  );

  console.log(currentDate);

  const handlePreviousDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setCurrentDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
  };

  useEffect(() => {
    setFormattedDate(
      new Intl.DateTimeFormat('en-US', options).format(currentDate)
    );
  }, [currentDate, options]);

  return {
    currentDate,
    formattedDate,
    handleNextDay,
    handlePreviousDay,
    setCurrentDate,
  };
};

export default useDates;
