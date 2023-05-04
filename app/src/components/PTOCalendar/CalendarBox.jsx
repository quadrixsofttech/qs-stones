import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const CalendarBox = ({ day, children, onMouseOver }) => (
  <Flex border={'1px solid black'} onMouseOver={onMouseOver}>
    <Flex flexDirection={'column'} padding={'2px'}>
      <Box>{day}</Box>
      <Box>{children}</Box>
    </Flex>
  </Flex>
);

export default CalendarBox;
