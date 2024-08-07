import {
  Avatar,
  Box,
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

const CalendarPopoverContent = ({ date, employeesToday, type, holiday }) => {
  return (
    <PopoverContent boxShadow={'md'}>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader {...styles.popoverHeader}>
        {holiday ? holiday.name : type.toUpperCase()} : {date}
      </PopoverHeader>
      <PopoverBody maxH="300px" overflowY="auto">
        <Flex {...styles.popoverBox}>
          {employeesToday.map((x) => {
            return (
              <Flex
                key={x.id + Math.random().toString()}
                alignItems={'center'}
                gap={'10px'}
              >
                <Avatar name={x.user.firstName} src={x.userId.image} />
                <Box>
                  <Text>{`${x.user.firstName}  ${x.user.lastName}`}</Text>
                  <Flex {...styles.leaveTypePill}>
                    <Text {...styles.leaveTypeText}>{x.type.toUpperCase()}</Text>
                  </Flex>
                </Box>
              </Flex>
            );
          })}
        </Flex>
      </PopoverBody>
    </PopoverContent>
  );
};
export default CalendarPopoverContent;
