import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, Select, Heading, Spinner } from '@chakra-ui/react';
import styles from './PTOCalendar.styles';
import CalendarBox from './CalendarBox';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import useEmployees from '../../hooks/useEmployees';
import moment from 'moment';
import useUser from '../../hooks/useUser';
import { years, months, daysOfWeek } from './constants/calendarInfo';
import { timeOffTypes } from '../../constants/TimeOffTypes';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [showSaturday, setShowSaturday] = useState(false);

  const [type, setType] = useState('Vacation');

  const { data, isLoading, refetchPTO } = useEmployees(type);
  const { holidays, holidaysLoading } = useUser();

  useEffect(() => {
    refetchPTO();
  }, [type, refetchPTO]);

  if (isLoading || holidaysLoading) {
    return <Spinner />;
  }

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
          holiday={holidays.holidays.find((obj) => obj.date === getDate())}
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

  return (
    <Box {...styles.calendarContainerStyles}>
      <Flex {...styles.header}>
        <Heading {...styles.headingTitle} as={'h2'}>
          Category
        </Heading>
        <Select
          {...styles.selectButton}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          {Object.values(timeOffTypes).map((type) => {
            return (
              <option value={type} key={type}>
                {`${type}`}
              </option>
            );
          })}
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
