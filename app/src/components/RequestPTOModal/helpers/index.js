export const validateVacationDates = (VacationDates) => {
  return VacationDates.every((subarray) => subarray.length === 2);
};

export const validateTimeOffType = (selectedTimeOffType) => {
  return selectedTimeOffType !== undefined;
};

export const validatePTOConditions = (VacationDates, selectedTimeOffType) => {
  return VacationDates.length > 5 && selectedTimeOffType === 'Paid time off';
};
