import { Flex } from '@chakra-ui/react';
import DayOfTheWeek from '../../../constants/DayOfTheWeek';
import styles from './GenerateDayOfTheWeek.styles';
import React, { useState, useEffect } from 'react';

export default function GenerateDayOfTheWeek({
  switchIsChecked,
  everyDayChecked,
  setEveryDayChecked,
}) {
  const [selectedColorIndices, setSelectedColorIndices] = useState([]);

  useEffect(() => {
    if (everyDayChecked) {
      setSelectedColorIndices(Object.keys(DayOfTheWeek));
    } else {
      setSelectedColorIndices([]);
    }
  }, [everyDayChecked]);

  const handleColorClick = (index) => {
    if (switchIsChecked) {
      if (everyDayChecked) {
        setEveryDayChecked(false);
        setSelectedColorIndices([index]);
      } else {
        setSelectedColorIndices((prevIndices) =>
          prevIndices.includes(index)
            ? prevIndices.filter((i) => i !== index)
            : [...prevIndices, index]
        );
      }
    }
  };

  return (
    <Flex alignItems="center" justifyContent="space-around" mt={4}>
      {Object.values(DayOfTheWeek).map((day, index) => (
        <Flex
          {...styles.dayContainer}
          key={index}
          color={
            !switchIsChecked
              ? 'gray.200'
              : everyDayChecked || selectedColorIndices.includes(index)
              ? 'white'
              : 'black'
          }
          bgColor={
            selectedColorIndices.includes(index) || everyDayChecked
              ? 'purple.400'
              : 'white'
          }
          borderColor={switchIsChecked ? 'gray.200' : 'gray.100'}
          onClick={() => handleColorClick(index)}
        >
          {day}
        </Flex>
      ))}
    </Flex>
  );
}
