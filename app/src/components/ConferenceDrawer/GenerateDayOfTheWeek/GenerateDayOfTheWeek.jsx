import { Flex } from '@chakra-ui/react';
import DayOfTheWeek from '../../../constants/DayOfTheWeek';
import styles from './GenerateDayOfTheWeek.styles';

export default function GenerateDayOfTheWeek() {
  return (
    <Flex alignItems={'center'} justifyContent={'space-around'} mt={4}>
      {Object.values(DayOfTheWeek).map((day, index) => (
        <Flex {...styles.dayContainer} key={index}>
          {day}
        </Flex>
      ))}
    </Flex>
  );
}
