import { Box, Flex } from '@chakra-ui/react';
import styles from './PTOCalendar.styles';

const CalendarBox = ({ day, children, isToday }) => {
  return (
    //Ovde ubaci Popover i to sve
    <Flex
      border={'1px'}
      borderColor={'gray.200'}
      padding={'8px'}
      backgroundColor={isToday ? 'purple.50' : 'white'}
      _hover={{ ...styles.onHoverBox }}
      _active={{ ...styles.onClickBox }}
    >
      <Flex flexDirection={'column'}>
        <Box
          textColor={'gray.700'}
          fontWeight={'semibold'}
          marginBottom={'8px'}
        >
          {day}
        </Box>
        <Box>{children}</Box>
      </Flex>
    </Flex>
  );
};

export default CalendarBox;
