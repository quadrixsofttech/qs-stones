import { Flex } from '@chakra-ui/react';
import DayOfTheWeek from '../../../constants/DayOfTheWeek';
import styles from './GenerateDayOfTheWeek.styles';
import React from 'react';

export default function GenerateDayOfTheWeek({ switchIsChecked }) {
  const [selectedColorIndex, setSelectedColorIndex] = React.useState(null);

  const handleColorClick = (index) => {
    setSelectedColorIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <Flex alignItems={'center'} justifyContent={'space-around'} mt={4}>
      {Object.values(DayOfTheWeek).map((day, index) => (
        <Flex
          {...styles.dayContainer}
          key={index}
          color={switchIsChecked ? 'black' : 'gray.200'}
          borderColor={switchIsChecked ? 'gray.200' : 'gray.100'}
          bgColor={selectedColorIndex === index ? 'purple.500' : 'transparent'}
          onClick={() => handleColorClick(index)}
        >
          {day}
        </Flex>
      ))}
    </Flex>
  );
}
