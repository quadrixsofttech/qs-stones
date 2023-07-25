import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import styles from './CurrentTimeLine.styles';

const CurrentTimeLine = ({
  startHour,
  endHour,
  intervals,
  orientation = 'horizontal',
}) => {
  const [currentTime, setCurrentTime] = useState(moment());
  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(moment());
    }, 30000);
  }, [currentTime]);

  const position = useMemo(() => {
    const now = currentTime.hours() * 60 + currentTime.minutes();
    const start = moment(startHour, 'HH:mm').hours() * 60;
    const end = moment(endHour, 'HH:mm').hours() * 60;
    const totalMinutes = end - start;

    const heightBoxVertical = 58;
    const widthBoxHorizontal = 176;

    const height = intervals * heightBoxVertical - intervals;

    const width = intervals * widthBoxHorizontal + intervals;

    if (now < start || now > end) {
      return false;
    }

    const minutesPerPixel =
      orientation === 'horizontal'
        ? totalMinutes / height
        : totalMinutes / width;

    const bottom = (end - now) / minutesPerPixel;

    const left = (now - start) / minutesPerPixel;

    return orientation === 'horizontal' ? `${bottom}px` : `${left + 250}px`;
  }, [currentTime, startHour, endHour, intervals, orientation]);

  return orientation === 'horizontal'
    ? position && (
        <Flex {...styles.currentTimeBox} bottom={position}>
          <Box {...styles.circle}></Box>
          <Text {...styles.time} backgroundColor={'white'}>
            {currentTime.format('HH:mm')}
          </Text>
        </Flex>
      )
    : position && (
        <Flex
          {...styles.currentTimeBoxVertical}
          flexDir={'column'}
          left={position}
        >
          <Box {...styles.circleVertical}></Box>
          <Text {...styles.timeVertical} backgroundColor={'white'}>
            {currentTime.format('HH:mm')}
          </Text>
        </Flex>
      );
};
export default CurrentTimeLine;
