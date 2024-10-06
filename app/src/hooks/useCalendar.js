import { useState } from "react";
import { groupDatesIntoRanges } from "../util";
import { toDateObject } from "react-multi-date-picker";

export const useCalendar = (isEditMode, matchingRequest) => {
  const [RemoteDates, setRemoteDates] = useState([]);
  const groupedDates = groupDatesIntoRanges(matchingRequest?.days);
  const [VacationDates, setVacationDates] = useState(
    isEditMode ? groupedDates : []
  );

  const handleRemoteDates = (selectedDates) => {
    const updatedDates = selectedDates.map((dateArray) => {
      return dateArray.map((selectedDate) => {
        return new toDateObject(
          Date.UTC(
            selectedDate.year,
            selectedDate.month - 1,
            selectedDate.day,
            0,
            0,
            0,
            0
          )
        );
      });
    });
    setRemoteDates(updatedDates);
  };
  const handleVacationDates = (selectedDates) => {
    const updatedDates = selectedDates.map((dateArray) => {
      return dateArray.map((selectedDate) => {
        return new toDateObject(
          Date.UTC(
            selectedDate.year,
            selectedDate.month - 1,
            selectedDate.day,
            0,
            0,
            0,
            0
          )
        );
      });
    });
    setVacationDates(updatedDates);
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
