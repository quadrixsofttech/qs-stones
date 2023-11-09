import { Flex } from '@chakra-ui/react';
import {
  DayOfTheWeek,
  DayOfTheWeekInMoment,
} from '../../../constants/DayOfTheWeek';
import styles from './GenerateDayOfTheWeek.styles';
import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useDatesBasedOnPickedDays } from '../useDatesBasedOnPickedDays';

export default function GenerateDayOfTheWeek({
  selectedDatesArray,
  setSelectedDatesArray,
}) {
  const [selectedColorIndices, setSelectedColorIndices] = useState([]);
  const { values, setFieldValue } = useFormikContext();

  // console.log(selectedColorIndices);

  useEffect(() => {
    if (values.everyDay) {
      setSelectedColorIndices(
        Object.values(DayOfTheWeekInMoment).map((day) => day)
      );
    } else {
      setSelectedColorIndices([]);
    }
  }, [values.everyDay, setFieldValue]);

  const handleColorClick = (index) => {
    if (values.reccuring) {
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

  useDatesBasedOnPickedDays(selectedColorIndices, setSelectedDatesArray);
  // console.log(selectedDatesArray);

  return (
    <Flex alignItems="center" justifyContent="space-around" mt={4}>
      {Object.values(DayOfTheWeek).map((day, index) => (
        <Flex
          {...styles.dayContainer}
          key={index}
          color={
            !values.reccuring
              ? 'gray.200'
              : values.everyDay || selectedColorIndices.includes(index + 2)
              ? 'white'
              : 'black'
          }
          bgColor={
            selectedColorIndices.includes(index + 2) || values.everyDay
              ? 'purple.400'
              : 'white'
          }
          borderColor={values.reccuring ? 'gray.200' : 'gray.100'}
          onClick={() => handleColorClick(index + 2)}
        >
          {day}
        </Flex>
      ))}
    </Flex>
  );
}
