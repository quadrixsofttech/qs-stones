import {
  Avatar,
  Flex,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import styles from './PTOCalendar.styles';

const CalendarPopoverContent = ({ boxFullDate, employeesToday, isPTO }) => {
  return (
    <PopoverContent boxShadow={'md'}>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader {...styles.popoverHeader}>
        {isPTO ? 'Pay time off' : 'Remote'} : {boxFullDate}
      </PopoverHeader>
      <PopoverBody maxH="300px" overflowY="auto">
        <Flex {...styles.popoverBox}>
          {employeesToday.map((x) => {
            return (
              <Flex key={x.id} alignItems={'center'} gap={'10px'}>
                <Avatar name={x.firstName} src={x.src} />
                <Text>{`${x.firstName}  ${x.lastName}`}</Text>
              </Flex>
            );
          })}
        </Flex>
      </PopoverBody>
    </PopoverContent>
  );
};
export default CalendarPopoverContent;
