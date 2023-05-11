import { createContext } from "react";

const CalendarContext = createContext({
  startDate: null,
  endDate: null,
  handleSetDates: () => {},
});

export default CalendarContext;