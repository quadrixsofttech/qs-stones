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

const CalendarPopoverContent = ({ date, employeesToday, type }) => {
  return (
    <PopoverContent boxShadow={'md'}>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader {...styles.popoverHeader}>
        {type.toUpperCase()} : {date}
      </PopoverHeader>
      <PopoverBody maxH="300px" overflowY="auto">
        <Flex {...styles.popoverBox}>
          {employeesToday.map((x) => {
            return (
              <Flex key={x.id} alignItems={'center'} gap={'10px'}>
                <Avatar name={x.user[0].firstName} src={x.src} />
                <Text>{`${x.user[0].firstName}  ${x.user[0].lastName}`}</Text>
              </Flex>
            );
          })}
        </Flex>
      </PopoverBody>
    </PopoverContent>
  );
};
export default CalendarPopoverContent;
