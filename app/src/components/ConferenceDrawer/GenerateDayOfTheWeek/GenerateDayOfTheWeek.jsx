import { Flex } from '@chakra-ui/react';
import DayOfTheWeek from '../../../constants/DayOfTheWeek';
import styles from './GenerateDayOfTheWeek.styles';
import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import moment from 'moment';

export default function GenerateDayOfTheWeek() {
  const [selectedColorIndices, setSelectedColorIndices] = useState([]);
  const { values, setFieldValue } = useFormikContext();
  const [selectedDatesArray, setSelectedDatesArray] = useState([]);

  useEffect(() => {
    if (!values.selectedDate || selectedColorIndices.length === 0) {
      setSelectedDatesArray([]);
      return;
    }

    let parsedDate = moment(values.selectedDate);
    let currentDayOfTheWeek = parsedDate.isoWeekday();
    let calculatedDatesArray = [];

    selectedColorIndices.forEach((index) => {
      let daysUntilNextDate = (index - currentDayOfTheWeek + 7) % 7;

      // If the current day is included in the selected days, don't wait until the next week
      if (daysUntilNextDate <= 0) {
        daysUntilNextDate += 7;
      }

      const nextSelectedDate = parsedDate
        .clone()
        .add(daysUntilNextDate, 'days');
      const formattedNextSelectedDay = nextSelectedDate.format('YYYY-MM-DD');
      calculatedDatesArray.push(formattedNextSelectedDay);
    });

    setSelectedDatesArray(calculatedDatesArray);
  }, [values.selectedDate, selectedColorIndices]);

  console.log(selectedDatesArray);

  useEffect(() => {
    if (values.everyDay) {
      setSelectedColorIndices(Object.keys(DayOfTheWeek));
    } else {
      setSelectedColorIndices([]);
    }
  }, [values.everyDay, setFieldValue]);

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
              : values.everyDay || selectedColorIndices.includes(index + 1)
              ? 'white'
              : 'black'
          }
          bgColor={
            selectedColorIndices.includes(index + 1) || values.everyDay
              ? 'purple.400'
              : 'white'
          }
          borderColor={values.repeatReservation ? 'gray.200' : 'gray.100'}
          onClick={() => handleColorClick(index + 1)}
        >
          {day}
        </Flex>
      ))}
    </Flex>
  );
}
