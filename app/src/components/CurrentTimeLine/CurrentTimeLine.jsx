import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './CurrentTimeLine.styles';

const CurrentTimeLine = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);

    return () => clearInterval(timer);
  }, [currentTime]);

  const getPosition = () => {
    const now = currentTime.hours() * 60 + currentTime.minutes();
    const start = 8 * 60;
    const end = 17 * 60;
    const totalMinutes = end - start;
    const height = 36 * 60 + 36; // 36px je gap

    if (now < start || now > end) {
      return 'none';
    }

    const minutesPerPixel = totalMinutes / height;
    const bottom = (end - now) / minutesPerPixel;

    return `${bottom}px`;
  };
  console.log(currentTime);
  return (
    <Flex {...styles.currentTimeBox} bottom={getPosition()}>
      <Box {...styles.circle}></Box>
      <Text {...styles.time}>{currentTime.format('HH:mm')}</Text>
    </Flex>
  );
};
export default CurrentTimeLine;
