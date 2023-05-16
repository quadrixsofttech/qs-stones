import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Popover,
  PopoverTrigger,
} from '@chakra-ui/react';
import styles from './PTOCalendar.styles';
import { useState } from 'react';
import CalendarPopoverContent from './CalendarPopoverContent';

const CalendarBox = ({ boxFullDate, day, employeesToday, isPTO }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return boxFullDate === formattedDate;
  };
  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <PopoverTrigger>
        <Flex
          {...styles.calendarBox}
          borderColor={isOpen ? 'purple.500' : 'gray.200'}
          backgroundColor={
            isOpen ? 'gray.200' : isToday() ? 'purple.50' : 'white'
          }
        >
          <Flex flexDirection={'column'}>
            <Box {...styles.calendarDateBox}>{day}</Box>
            <Box height={'32px'}>
              <AvatarGroup {...styles.avatarGroup}>
                {employeesToday.map((x) => {
                  return <Avatar key={x.id} name={x.firstName} src={x.src} />;
                })}
              </AvatarGroup>
            </Box>
          </Flex>
        </Flex>
      </PopoverTrigger>
      <CalendarPopoverContent
        boxFullDate={boxFullDate}
        employeesToday={employeesToday}
        isPTO={isPTO}
      />
    </Popover>
  );
};

export default CalendarBox;
