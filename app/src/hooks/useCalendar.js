import { useState } from 'react';

export const useCalendar = () => {
  const [RemoteDates, setRemoteDates] = useState([]);
  const [VacationDates, setVacationDates] = useState([]);

  const handleRemoteDates = (selectedDates) => {
    setRemoteDates(selectedDates);
  };
  const handleVacationDates = (selectedDates) => {
    setVacationDates(selectedDates);
  };
  const removeRemoteTag = (x) => {
    setRemoteDates(RemoteDates.filter((element) => element !== x));
  };
  const removeVacationTag = (x) => {
    setVacationDates(VacationDates.filter((element) => element !== x));
  };

  return {
    RemoteDates,
    setRemoteDates,
    VacationDates,
    setVacationDates,
    handleRemoteDates,
    handleVacationDates,
    removeRemoteTag,
    removeVacationTag,
  };
};
