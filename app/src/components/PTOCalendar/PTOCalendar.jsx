import { useState } from 'react';
import { Box, Flex, Button, Text, Select, Avatar } from '@chakra-ui/react';
import styles from './PTOCalendar.styles';
import CalendarBox from './CalendarBox';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import avatar from '../../images/avatar.jpg';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [showSaturday, setShowSaturday] = useState(false);
  const [isRemote, setRemote] = useState(true);

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
    const getDayDate = () => {
      return i < 10 ? '0' + i : i.toString();
    };
    const createKey = () => {
      return (
        date.getFullYear() +
        '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        getDayDate()
      );
    };
    if (
      showSaturday
        ? dayOfWeek >= 1 && dayOfWeek <= 6
        : dayOfWeek >= 1 && dayOfWeek <= 5
    ) {
      days.push(
        <CalendarBox
          key={createKey()}
          day={getDayDate()}
          onMouseOver={() => {
            //alert(createKey());
          }}
        >
          <Avatar p={'1px'} size={'xs'} src={avatar} />
          <Avatar
            p={'1px'}
            size={'xs'}
            src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
          />
        </CalendarBox>
      );
    }
  }

  const totalDays = [...blanks, ...days]; //OVde map za novi key = 'date tacan'

  return (
    <Box {...styles.calendarContainerStyles}>
      <Flex {...styles.header}>
        <Text p="16px" size={'md'} fontWeight={'bold'}>
          PTO Category
        </Text>
        <Select
          {...styles.selectButton}
          onChange={(e) => setRemote(e.target.value === 'Remote')}
          value={isRemote ? 'Remote' : 'Pay Time Off'}
        >
          <option value="Remote">Remote</option>
          <option value="Pay Time Off">Pay Time Off</option>
        </Select>
      </Flex>
      <Flex justifyContent={'space-around'} alignItems={'center'} p={'10px'}>
        <Text width={'200px'} fontSize="sm" fontWeight={'semibold'}>
          {date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </Text>
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
            onClick={() =>
              setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
            }
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
