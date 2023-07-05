import { Box, Flex } from '@chakra-ui/react';
import DayOfTheWeek from '../../constants/DayOfTheWeek';

export default function GenerateDayOfTheWeek() {
  return (
    <Flex alignItems={'center'} justifyContent={'space-around'} mt={2}>
      {Object.values(DayOfTheWeek).map((day) => (
        <Box
          borderRadius={'50%'}
          w={'50'}
          h={'50'}
          border={'red'}
          key={DayOfTheWeek.id + '-' + day}
        >
          {day}
        </Box>
      ))}
    </Flex>
  );
}
