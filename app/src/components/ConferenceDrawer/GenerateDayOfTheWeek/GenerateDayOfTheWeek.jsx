import { Flex } from '@chakra-ui/react';
import DayOfTheWeek from '../../../constants/DayOfTheWeek';
import styles from './GenerateDayOfTheWeek.styles';
import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';

export default function GenerateDayOfTheWeek({}) {
  const [selectedColorIndices, setSelectedColorIndices] = useState([]);
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (values.everyDay) {
      setSelectedColorIndices(Object.keys(DayOfTheWeek));
    } else {
      setSelectedColorIndices([]);
    }
  }, [values.everyDay]);

  const handleColorClick = (index) => {
    if (values.repeatReservation) {
      if (values.everyDay) {
        setFieldValue('everyDay', false);
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
            !values.repeatReservation
              ? 'gray.200'
              : values.everyDay || selectedColorIndices.includes(index)
              ? 'white'
              : 'black'
          }
          bgColor={
            selectedColorIndices.includes(index) || values.everyDay
              ? 'purple.400'
              : 'white'
          }
          borderColor={values.repeatReservation ? 'gray.200' : 'gray.100'}
          onClick={() => handleColorClick(index)}
        >
          {day}
        </Flex>
      ))}
    </Flex>
  );
}
