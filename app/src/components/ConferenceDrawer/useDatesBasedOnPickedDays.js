import { useFormikContext } from 'formik';
import moment from 'moment';
import { useEffect } from 'react';

export const useDatesBasedOnPickedDays = (
  selectedColorIndices,
  setSelectedDatesArray
) => {
  const { values } = useFormikContext();

  useEffect(() => {
    switch (values.meetingRepetition) {
      case 'Never':
        if (!values.selectedDate || selectedColorIndices.length === 0) {
          setSelectedDatesArray([]);
          return;
        }

        let calculatedDatesArray = [];

        for (let week = 0; week < 52; week++) {
          let currentDayOfTheWeek = values.selectedDate.format('d');
          let datesForThisWeek = [];

          selectedColorIndices.forEach((index) => {
            let daysUntilNextDate = (index - currentDayOfTheWeek + 7) % 7;

            if (daysUntilNextDate <= 0) {
              daysUntilNextDate += 7;
            }

            let newDate = moment(new Date(values.selectedDate));

            const nextSelectedDate = newDate
              .clone()
              .add(week * 7 + daysUntilNextDate, 'days');
            const formattedNextSelectedDay =
              nextSelectedDate.format('YYYY-MM-DD');
            datesForThisWeek.push(formattedNextSelectedDay);
          });

          calculatedDatesArray.push(datesForThisWeek);
        }

        setSelectedDatesArray(calculatedDatesArray);
        break;
      case 'After n occurences':
        if (!values.selectedDate || selectedColorIndices.length === 0) {
          setSelectedDatesArray([]);
          return;
        }

        let calculatedDatesArrayForOccureces = [];

        for (let week = 0; week < values.numberOfOccurences; week++) {
          let currentDayOfTheWeek = values.selectedDate.format('d');
          let datesForThisWeek = [];

          selectedColorIndices.forEach((index) => {
            let daysUntilNextDate = (index - currentDayOfTheWeek + 7) % 7;

            if (daysUntilNextDate <= 0) {
              daysUntilNextDate += 7;
            }

            let newDate = moment(new Date(values.selectedDate));

            const nextSelectedDate = newDate
              .clone()
              .add(week * 7 + daysUntilNextDate, 'days');
            const formattedNextSelectedDay =
              nextSelectedDate.format('YYYY-MM-DD');
            datesForThisWeek.push(formattedNextSelectedDay);
          });

          calculatedDatesArrayForOccureces.push(datesForThisWeek);
        }

        setSelectedDatesArray(calculatedDatesArrayForOccureces);
        break;
      case 'On specific date':
        if (
          !values.selectedDate ||
          !values.selectedDateFromInput ||
          selectedColorIndices.length === 0
        ) {
          setSelectedDatesArray([]);
          return;
        }

        let calculatedDatesArrayForDate = [];
        let currentDate = moment(new Date(values.selectedDate));

        while (
          currentDate.isSameOrBefore(values.selectedDateFromInput, 'day')
        ) {
          let currentDayOfTheWeek = currentDate.format('d');
          let datesForThisWeek = [];

          selectedColorIndices.forEach((index) => {
            let daysUntilNextDate = (index - currentDayOfTheWeek + 7) % 7;

            if (daysUntilNextDate <= 0) {
              daysUntilNextDate += 7;
            }

            const nextSelectedDate = currentDate
              .clone()
              .add(daysUntilNextDate, 'days');
            const formattedNextSelectedDay =
              nextSelectedDate.format('YYYY-MM-DD');
            datesForThisWeek.push(formattedNextSelectedDay);
          });

          calculatedDatesArrayForDate.push(datesForThisWeek);
          currentDate.add(7, 'days');
        }

        setSelectedDatesArray(calculatedDatesArrayForDate);
        break;
      default:
        break;
    }
  }, [
    values.selectedDate,
    selectedColorIndices,
    setSelectedDatesArray,
    values.meetingRepetition,
    values.numberOfOccurences,
    values.selectedDateFromInput,
  ]);
};
