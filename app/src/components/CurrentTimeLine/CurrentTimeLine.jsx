import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import styles from './CurrentTimeLine.styles';

const CurrentTimeLine = ({ startHour, endHour, intervals }) => {
  const [currentTime, setCurrentTime] = useState(moment());
  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(moment());
    }, 30000);
  }, [currentTime]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const position = useMemo(() => {
    const now = currentTime.hours() * 60 + currentTime.minutes();
    const start = moment(startHour, 'HH:mm').hours() * 60;
    const end = moment(endHour, 'HH:mm').hours() * 60;
    const totalMinutes = end - start;

    const height = intervals * 58 - intervals;

    if (now < start || now > end) {
      return false;
    }

    const minutesPerPixel = totalMinutes / height;
    const bottom = (end - now) / minutesPerPixel;

    return `${bottom}px`;
  }, [currentTime, startHour, endHour, intervals]);

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
