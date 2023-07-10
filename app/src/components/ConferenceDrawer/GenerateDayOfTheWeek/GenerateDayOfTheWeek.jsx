import { Flex, border } from '@chakra-ui/react';
import DayOfTheWeek from '../../../constants/DayOfTheWeek';
import styles from './GenerateDayOfTheWeek.styles';

export default function GenerateDayOfTheWeek({ switchIsChecked }) {
  return (
    <Flex alignItems={'center'} justifyContent={'space-around'} mt={4}>
      {Object.values(DayOfTheWeek).map((day, index) => (
        <Flex
          {...styles.dayContainer}
          key={index}
          color={switchIsChecked ? 'black' : 'gray.200'}
          borderColor={switchIsChecked ? 'gray.200' : 'gray.100'}
        >
          {day}
        </Flex>
      ))}
    </Flex>
  );
}
