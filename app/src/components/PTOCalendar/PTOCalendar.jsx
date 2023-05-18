import { useState } from 'react';
import { Box, Flex, Button, Select, Heading } from '@chakra-ui/react';
import styles from './PTOCalendar.styles';
import CalendarBox from './CalendarBox';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import useEmployees from '../../hooks/useEmployees';
import moment from 'moment';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [showSaturday, setShowSaturday] = useState(false);

  const [type, setType] = useState('Pay Time Off');
  const {
    employeesPTO,
    employeesRemote,
    employeesPTOLoading,
    employeesRemoteLoading,
  } = useEmployees();

  if (employeesPTOLoading) {
    return <div>Loading...</div>;
  }
  if (employeesRemoteLoading) {
    return <div>Loading...</div>;
  }

  const employees = type === 'Pay Time Off' ? employeesPTO : employeesRemote;

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
    blanks.push(<Box backgroundColor={'blackAlpha.50'} key={`blank-${i}`} />);
  }

  const days = [];
  const currentDate = moment();

  for (let i = 1; i <= daysInMonth; i++) {
    const dayOfWeek = new Date(date.getFullYear(), date.getMonth(), i).getDay();
    const getDayDate = () => {
      return i < 10 ? '0' + i : i.toString();
    };

    const getDate = () => {
      return currentDate.clone().date(i).format('YYYY-MM-DD');
    };

    const employeesToday = employees.filter((x) => x.date === getDate());

    if (
      showSaturday
        ? dayOfWeek >= 1 && dayOfWeek <= 6
        : dayOfWeek >= 1 && dayOfWeek <= 5
    ) {
      days.push(
        <CalendarBox
          key={getDate()}
          day={getDayDate()}
          date={getDate()}
          employeesToday={employeesToday}
          type={type}
        ></CalendarBox>
      );
    }
  }

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newDate =
      name === 'month'
        ? new Date(date.getFullYear(), value, 1)
        : new Date(value, date.getMonth(), 1);

    setDate(newDate);
  };

  const totalDays = [...blanks, ...days];

  const months = [
    { key: 'January', value: 0 },
    { key: 'February', value: 1 },
    { key: 'March', value: 2 },
    { key: 'April', value: 3 },
    { key: 'May', value: 4 },
    { key: 'June', value: 5 },
    { key: 'July', value: 6 },
    { key: 'August', value: 7 },
    { key: 'September', value: 8 },
    { key: 'October', value: 9 },
    { key: 'November', value: 10 },
    { key: 'December', value: 11 },
  ];

  const years = [
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
    '2026',
  ];

  return (
    <Box {...styles.calendarContainerStyles}>
      <Flex {...styles.header}>
        <Heading {...styles.headingTitle} as={'h2'}>
          PTO Category
        </Heading>
        <Select
          {...styles.selectButton}
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          <option value="Pay Time Off">Pay Time Off</option>
          <option value="Remote">Remote</option>
        </Select>
      </Flex>
      <Flex {...styles.selectionBox}>
        <Flex width={'48'} gap={'2.5'}>
          <Select
            {...styles.selectButton}
            onChange={(e) => handleDateChange(e)}
            name="year"
            value={date.getFullYear()}
          >
            {years.map((year) => {
              return (
                <option key={`godina-${year}`} value={year}>
                  {year}
                </option>
              );
            })}
          </Select>
          <Select
            {...styles.selectButton}
            onChange={(e) => handleDateChange(e)}
            name="month"
            value={date.getMonth()}
          >
            {months.map((month) => {
              return (
                <option key={`mesec-${month.key}`} value={month.value}>
                  {month.key}
                </option>
              );
            })}
          </Select>
        </Flex>
        <Flex {...styles.prevNextBox}>
          <Button
            size={'xs'}
            backgroundColor={'blackAlpha.50'}
            onClick={() =>
              setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
            }
          >
            <BiChevronLeft />
          </Button>

          <Button
            size={'xs'}
            backgroundColor={'blackAlpha.50'}
            onClick={() => {
              setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
            }}
          >
            <BiChevronRight />
          </Button>
        </Flex>
        <Select
          {...styles.selectButton}
          onChange={(e) =>
            setShowSaturday(e.target.value === 'Weekdays + Saturday')
          }
          value={showSaturday ? 'Weekdays + Saturday' : 'Weekdays'}
        >
          <option value="Weekdays">Weekdays</option>
          <option value="Weekdays + Saturday">Weekdays + Saturday</option>
        </Select>
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
    </Box>
  );
};

export default Calendar;
