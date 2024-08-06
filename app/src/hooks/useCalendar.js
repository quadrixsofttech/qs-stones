import { useState } from 'react';
import { groupDatesIntoRanges } from '../util';

export const useCalendar = (isEditMode, matchingRequest) => {
  const [RemoteDates, setRemoteDates] = useState([]);
  const groupedDates = groupDatesIntoRanges(matchingRequest?.days);
  const [VacationDates, setVacationDates] = useState(
    isEditMode ? groupedDates : []
  );

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
