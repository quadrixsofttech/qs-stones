import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, Select, Heading, Spinner } from '@chakra-ui/react';
import styles from './PTOCalendar.styles';
import CalendarBox from './CalendarBox';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import useEmployees from '../../hooks/useEmployees';
import moment from 'moment';
import useUser from '../../hooks/useUser';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [showSaturday, setShowSaturday] = useState(false);

  const [type, setType] = useState('vacation');

  const { data, isLoading, refetchPTO } = useEmployees(type);
  const {holidays, holidaysLoading} = useUser();

  useEffect(() => {
    refetchPTO();
  }, [type, refetchPTO]);

  if (isLoading || holidaysLoading) {
    return <Spinner />;
  }

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  if (showSaturday) {
    daysOfWeek.push('Saturday');
  }

  const daysInMonth = moment(date).daysInMonth();

  const firstDayOfMonth = moment(date).startOf('month').day();

  const blanks = [];
  for (let i = 0; i < firstDayOfMonth - 1; i++) {
    blanks.push(<Box backgroundColor={'blackAlpha.50'} key={`blank-${i}`} />);
  }

  const days = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const dayOfWeek = moment(date).date(i).day();

    const getDate = () => {
      return moment(date).date(i).format('YYYY-MM-DD');
    };


    const employeesToday = data
      ? data.pto.filter((x) => x.days.includes(getDate()))
      : [];

    if (
      showSaturday
        ? dayOfWeek >= 1 && dayOfWeek <= 6
        : dayOfWeek >= 1 && dayOfWeek <= 5
    ) {
      days.push(
        <CalendarBox
          key={getDate()}
          date={getDate()}
          employeesToday={employeesToday}
          type={type}
          holiday={holidays.holidays.find(obj => obj.date === getDate())}
        ></CalendarBox>
      );
    }
  }

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    let newDate;

    if (name === 'year') {
      newDate = moment(date).year(parseInt(value));
    } else if (name === 'month') {
      newDate = moment(date).month(value);
    }

    setDate(newDate.format('YYYY-MM-DD'));
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
          onChange={(e) => {
            setType(e.target.value);
          }}
          value={type}
        >
          <option value="vacation">Vacation</option>
          <option value="remote">Remote</option>
        </Select>
      </Flex>
      <Flex {...styles.selectionBox}>
        <Flex width={'48'} gap={'2.5'}>
          <Select
            {...styles.selectButton}
            onChange={(e) => handleDateChange(e)}
            name="year"
            value={moment(date).format('YYYY')}
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
            value={moment(date).month().toString()}
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
            onClick={() => {
              const newDate = moment(date).subtract(1, 'month');
              setDate(newDate.format('YYYY-MM-DD'));
            }}
          >
            <BiChevronLeft />
          </Button>

          <Button
            size={'xs'}
            backgroundColor={'blackAlpha.50'}
            onClick={() => {
              const newDate = moment(date).add(1, 'month');
              setDate(newDate.format('YYYY-MM-DD'));
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
