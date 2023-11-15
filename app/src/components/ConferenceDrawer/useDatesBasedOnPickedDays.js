import { useFormikContext } from 'formik';
import moment from 'moment';
import { useEffect } from 'react';

export const useDatesBasedOnPickedDays = (
  selectedColorIndices,
  setSelectedDatesArray
) => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    switch (values.meetingRepetition) {
      case 'Never':
        if (!values.selectedDate || selectedColorIndices.length === 0) {
          setFieldValue('selectedDatesInDays', []);
          return;
        }

        let calculatedDatesArray = [];
        let datesForThisWeek = [];

        for (let week = 0; week < 52; week++) {
          let currentDayOfTheWeek = values.selectedDate.format('d');

          selectedColorIndices.forEach((index) => {
            let daysUntilNextDate = (index - currentDayOfTheWeek + 6) % 7;

            if (daysUntilNextDate <= 0) {
              daysUntilNextDate += 7;
            }

            let newDate = moment(new Date(values.selectedDate));

            const nextSelectedDate = newDate
              .clone()
              .add(week * 7 + daysUntilNextDate, 'days');
            const formattedNextSelectedDay =
              nextSelectedDate.format('YYYY-MM-DD');
            datesForThisWeek.push([formattedNextSelectedDay]);
          });
        }
        calculatedDatesArray = [
          [moment.utc(values.selectedDate.format('YYYY-MM-DD'))],
          ...datesForThisWeek,
        ];

        setFieldValue('selectedDatesInDays', calculatedDatesArray);

        break;
      case 'After n occurences':
        if (!values.selectedDate || selectedColorIndices.length === 0) {
          setFieldValue('selectedDatesInDays', []);
          return;
        }

        let calculatedDatesArrayForOccureces = [];
        let datesForThisWeekOccurences = [];

        for (let week = 0; week < values.numberOfOccurences; week++) {
          let currentDayOfTheWeek = values.selectedDate.format('d');

          selectedColorIndices.forEach((index) => {
            let daysUntilNextDate = (index - currentDayOfTheWeek + 6) % 7;

            if (daysUntilNextDate <= 0) {
              daysUntilNextDate += 7;
            }

            let newDate = moment(new Date(values.selectedDate));

            const nextSelectedDate = newDate
              .clone()
              .add(week * 7 + daysUntilNextDate, 'days');
            const formattedNextSelectedDay =
              nextSelectedDate.format('YYYY-MM-DD');
            datesForThisWeekOccurences.push([formattedNextSelectedDay]);
          });
        }

        calculatedDatesArrayForOccureces = [
          [moment.utc(values.selectedDate.format('YYYY-MM-DD'))],
          ...datesForThisWeekOccurences,
        ];

        setFieldValue('selectedDatesInDays', calculatedDatesArrayForOccureces);
        break;
      case 'On specific date':
        if (
          !values.selectedDate ||
          !values.selectedDateFromInput ||
          selectedColorIndices.length === 0
        ) {
          setFieldValue('selectedDatesInDays', []);
          return;
        }

        let calculatedDatesArrayForDate = [];
        let datesForThisWeekSelectedDate = [];

        let currentDate = moment(new Date(values.selectedDate));

        while (currentDate.isBefore(values.selectedDateFromInput, 'day')) {
          let currentDayOfTheWeek = currentDate.format('d');

          selectedColorIndices.forEach((index) => {
            let daysUntilNextDate = (index - currentDayOfTheWeek + 6) % 7;

            if (daysUntilNextDate <= 0) {
              daysUntilNextDate += 7;
            }

            const nextSelectedDate = currentDate
              .clone()
              .add(daysUntilNextDate, 'days');
            const formattedNextSelectedDay =
              nextSelectedDate.format('YYYY-MM-DD');
            datesForThisWeekSelectedDate.push([formattedNextSelectedDay]);
          });

          currentDate.add(7, 'days');
        }

        calculatedDatesArrayForDate = [
          [moment.utc(values.selectedDate.format('YYYY-MM-DD'))],
          ...datesForThisWeekSelectedDate,
        ];

        setFieldValue('selectedDatesInDays', calculatedDatesArrayForDate);
        break;
      default:
        break;
    }
  }, [
    values.selectedDate,
    selectedColorIndices,
    values.meetingRepetition,
    values.numberOfOccurences,
    values.selectedDateFromInput,
    setFieldValue,
    setSelectedDatesArray,
  ]);
};
