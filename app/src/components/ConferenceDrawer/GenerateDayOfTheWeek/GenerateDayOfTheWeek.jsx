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

  // console.log(values.selectedDate.format('YYYY-MM-DD'));
  // const parsedDate = values.selectedDate.format('YYYY-MM-DD');
  // const currentDayOfTheWeek = moment(values.selectedDate).day();
  // let formattedNextWednesday;

  // selectedColorIndices.forEach((index) => {
  //   const daysUntilNextDate = (index - currentDayOfTheWeek + 7) % 7;

  //   const nextWednesdayDate = parsedDate.clone().add(daysUntilNextDate, 'days');

  //   formattedNextWednesday = nextWednesdayDate.format('MM-DD-YYYY');
  //   selectedDatesArray.push(formattedNextWednesday);
  // });

  // let selectedDatesArray = [];

  // selectedColorIndices.forEach((index) => {
  //   const parsedDate = moment(values.selectedDate);
  //   const currentDayOfTheWeek = parsedDate.isoWeekday();
  //   let daysUntilNextDate = (index - currentDayOfTheWeek + 7) % 7;
  //   console.log('daysUntilNextDate', daysUntilNextDate);

  //   // If the current day is included in the selected days, don't wait until the next week
  //   if (daysUntilNextDate < 0) {
  //     daysUntilNextDate += 7;
  //   }

  //   // Clone the parsedDate to avoid mutating it
  //   const nextSelectedDate = parsedDate.clone().add(daysUntilNextDate, 'days');
  //   const formattedNextSelectedDay = nextSelectedDate.format('YYYY-MM-DD');
  //   selectedDatesArray.push(formattedNextSelectedDay);
  // });

  // console.log(selectedDatesArray);
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
      if (daysUntilNextDate < 0) {
        daysUntilNextDate += 7;
      }

      // Clone the parsedDate to avoid mutating it
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
