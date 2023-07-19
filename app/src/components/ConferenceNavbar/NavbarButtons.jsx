import { Box, Divider, Flex } from '@chakra-ui/react';
import { TodayButtonType } from './constants/ButtonTypes';
import styles from './NavbarButtons.styles';
import moment from 'moment';

export default function NavbarButtons({
  currentDate,
  setCurrentDate,
  timelineType,
  setTimelineType,
  timelineFilter,
  setTimelineFilter,
}) {
  const handleClick = (label) => {
    setTimelineType(label);
  };

  const handleTodayButtonClick = () => {
    const today = moment();
    setCurrentDate(today);
  };

  const isTodaysDate = (currDate) => {
    const today = moment();
    const dateToCompare = moment(currDate);
    return dateToCompare.isSame(today, 'day');
  };

  return (
    <Flex gap={3}>
      <Box
        {...styles.buttonStyles}
        onClick={handleTodayButtonClick}
        color={isTodaysDate(currentDate) ? 'purple.700' : 'gray.700'}
        bg={isTodaysDate(currentDate) ? 'purple.50' : 'white'}
      >
        {TodayButtonType.TODAY}
      </Box>
      <Divider orientation="vertical" h={8} />
      <Box
        {...styles.buttonStyles}
        onClick={() => {
          handleClick('TIMELINE DAY');
          setTimelineFilter('TIMELINE DAY');
        }}
        color={timelineType === 'TIMELINE DAY' ? 'purple.700' : 'gray.700'}
        bg={timelineType === 'TIMELINE DAY' ? 'purple.50' : 'white'}
        _hover={{ backgroundColor: 'gray.200' }}
      >
        TIMELINE DAY
      </Box>
      <Box
        {...styles.buttonStyles}
        onClick={() => {
          handleClick('TIMELINE WEEK');
          setTimelineFilter('TIMELINE WEEK');
        }}
        color={timelineType === 'TIMELINE WEEK' ? 'purple.700' : 'gray.700'}
        bg={timelineType === 'TIMELINE WEEK' ? 'purple.50' : 'white'}
        _hover={{ backgroundColor: 'gray.200' }}
      >
        TIMELINE WEEK
      </Box>
    </Flex>
  );
}
