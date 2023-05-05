import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const CalendarBox = ({ day, children, onMouseOver }) => (
  <Flex
    border={'1px'}
    borderColor={'gray.200'}
    onMouseOver={onMouseOver}
    padding={'8px'}
  >
    <Flex flexDirection={'column'}>
      <Box textColor={'gray.700'} fontWeight={'semibold'} marginBottom={'8px'}>
        {day}
      </Box>
      <Box>{children}</Box>
    </Flex>
  </Flex>
);

export default CalendarBox;
