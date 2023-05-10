import { Flex } from '@chakra-ui/react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { useState } from 'react';
import { useCalendar } from '../../hooks/useCalendar';

export const CustomCalendar = () => {
  const [value, setValue] = useState([
    new DateObject().setDay(15),
    new DateObject().add(1, 'month').setDay(15),
  ]);
  const { startDate, endDate, selectedRange, handleCalendarChange} = useCalendar();

  const handleRangeChange = (nextSelectedRange) => {
   return handleCalendarChange(nextSelectedRange);
  };

  return (
    <>
      <Flex alignItems={'center'} justifyContent={'center'}>
        <Calendar
          range
          rangeHover
          numberOfMonths={2}
          startDate={startDate}
          endDate={endDate}
          selectedRange={selectedRange}
          onChange={handleRangeChange}
          />
      </Flex>
    </>
  );
};
