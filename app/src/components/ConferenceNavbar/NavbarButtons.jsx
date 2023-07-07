import { Box, Divider, Flex } from '@chakra-ui/react';
import { ButtonTypes, TodayButtonType } from './constants/ButtonTypes';
import styles from './NavbarButtons.styles';
import moment from 'moment';

export default function NavbarButtons({
  currentDate,
  setCurrentDate,
  timelineFormat,
  setTimelineFormat,
}) {
  const handleClick = (label) => {
    setTimelineFormat(label);
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
      {Object.values(ButtonTypes).map((type) => {
        return (
          <Box
            {...styles.buttonStyles}
            key={type}
            onClick={() => handleClick(type)}
            color={timelineFormat === type ? 'purple.700' : 'gray.700'}
            bg={timelineFormat === type ? 'purple.50' : 'white'}
            _hover={{ backgroundColor: 'gray.200' }}
          >
            {type}
          </Box>
        );
      })}
    </Flex>
  );
}
