import { Box, Divider, Flex } from '@chakra-ui/react';
import { ButtonTypes, TodayButtonType } from './constants/ButtonTypes';
import { useState } from 'react';
import styles from './NavbarButtons.styles';
import moment from 'moment';

export default function NavbarButtons({
  setCurrentDate,
  timelineFormat,
  setTimelineFormat,
}) {
  const [activeToday, setActiveToday] = useState(false);

  const handleClick = (label) => {
    setTimelineFormat(label);
  };

  const handleTodayButtonClick = () => {
    setActiveToday(!activeToday);
    const today = moment();
    setCurrentDate(today);
  };

  return (
    <Flex gap={3}>
      <Box
        {...styles.buttonStyles}
        onClick={handleTodayButtonClick}
        color={activeToday ? 'purple.700' : 'gray.700'}
        bg={activeToday ? 'purple.50' : 'white'}
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
          >
            {type}
          </Box>
        );
      })}
    </Flex>
  );
}
