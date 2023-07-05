import { Flex } from '@chakra-ui/react';
import DayOfTheWeek from '../../constants/DayOfTheWeek';

export default function GenerateDayOfTheWeek() {
  return (
    <Flex alignItems={'center'} justifyContent={'space-around'} mt={4}>
      {Object.values(DayOfTheWeek).map((day) => (
        <Flex
          borderRadius={'50%'}
          w={'8'}
          h={'8'}
          fontSize='sm'
          alignItems={'center'}
          justifyContent={'center'}
          border={'1px solid gray'}
          key={DayOfTheWeek.id + '-' + day}
        >
          {day}
        </Flex>
      ))}
    </Flex>
  );
}
