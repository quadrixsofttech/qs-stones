import { useState } from 'react';
import { Box, Flex, Button, Text, Select, Avatar } from '@chakra-ui/react';
import styles from './PTOCalendar.styles';
import CalendarBox from './CalendarBox';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [showSaturday, setShowSaturday] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  if (showSaturday) {
    daysOfWeek.push('Saturday');
  }

  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

  const blanks = [];
  for (let i = 0; i < firstDayOfMonth - 1; i++) {
    blanks.push(<Box key={`blank-${i}`} />);
  }

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const dayOfWeek = new Date(date.getFullYear(), date.getMonth(), i).getDay();
    if (
      showSaturday
        ? dayOfWeek >= 1 && dayOfWeek <= 6
        : dayOfWeek >= 1 && dayOfWeek <= 5
    ) {
      days.push(
        <CalendarBox key={`key-${i}`} day={i}>
          {/* Add custom avatar here */}
          <Avatar p={'1px'} size={'sm'} src="" />
        </CalendarBox>
      );
    }
  }

  const totalDays = [...blanks, ...days]; //OVde map za novi key = 'date tacan'

  return (
    <Box {...styles.calendarContainerStyles}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        {...styles.calendarHeaderStyles}
      >
        <Button
          onClick={() =>
            setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
          }
        >
          Prev
        </Button>
        <Text fontSize="md">
          {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Text>
        <Button
          onClick={() =>
            setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
          }
        >
          Next
        </Button>
      </Flex>
      <Flex
        {...styles.calendarGridStyles}
        {...(showSaturday ? styles.sixColumnGridStyles : {})}
      >
        {daysOfWeek.map((day) => (
          <Box key={`weekday-${day}`} {...styles.calendarDayStyles}>
            {day}
          </Box>
        ))}
        {totalDays}
      </Flex>
      <Select
        mt={4}
        onChange={(e) =>
          setShowSaturday(e.target.value === 'Weekdays + Saturday')
        }
        value={showSaturday ? 'Weekdays + Saturday' : 'Weekdays'}
      >
        <option value="Weekdays">Weekdays</option>
        <option value="Weekdays + Saturday">Weekdays + Saturday</option>
      </Select>
    </Box>
  );
};

export default Calendar;
