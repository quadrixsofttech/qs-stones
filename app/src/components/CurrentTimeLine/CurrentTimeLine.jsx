import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const position = useMemo(() => {
    const now = currentTime.hours() * 60 + currentTime.minutes();
    const start = 8 * 60;
    const end = 17 * 60;
    const totalMinutes = end - start;
    const height = 36 * 60 + 36;

    if (now < start || now > end) {
      return false;
    }

    const minutesPerPixel = totalMinutes / height;
    const bottom = (end - now) / minutesPerPixel;

    return `${bottom}px`;
  }, [currentTime]);

  return (
    position && (
      <Flex {...styles.currentTimeBox} bottom={position}>
        <Box {...styles.circle}></Box>
        <Text {...styles.time} backgroundColor={'white'}>
          {currentTime.format('HH:mm')}
        </Text>
      </Flex>
    )
  );
};
export default CurrentTimeLine;
