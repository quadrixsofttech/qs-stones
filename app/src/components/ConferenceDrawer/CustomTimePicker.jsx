import React, { useEffect } from 'react';
import { Flex, Select } from '@chakra-ui/react';
import moment from 'moment';
import { ErrorMessage, Field, useFormikContext } from 'formik';

const TimePicker = ({ isEditMode }) => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    const start = moment(values.selectedDate).startOf('day').add(8, 'hours');
    const end = moment(values.selectedDate).startOf('day').add(17, 'hours');

    if (isEditMode) {
      const startAtArray = calculateTimes(start, end, 15);
      setFieldValue('startAtArray', startAtArray);
      const endAtArray = calculateTimes(start, end, 15);
      setFieldValue('endAtArray', endAtArray);
    } else {
      if (
        values.selectedDate.format('YYYY-MM-DD') !==
        moment().format('YYYY-MM-DD')
      ) {
        start.set('date', moment(values.selectedDate).date());
        end.set('date', moment(values.selectedDate).date());
        const times = calculateTimes(start, end, 15);
        setFieldValue('startAtArray', times);
      } else {
        const times = calculateTimes(start, end, 15);

        const currentTime = moment();
        const nearestTimes = times.filter((time) =>
          moment(time, 'HH:mm').isSameOrAfter(currentTime, 'minute')
        );
        setFieldValue('startAtArray', nearestTimes);

        setFieldValue('startTime', '');
        setFieldValue('endTime', '');
      }
    }
  }, [values.selectedDate, setFieldValue, isEditMode]);

  useEffect(() => {
    if (values.startTime) {
      const startTimeMoment = moment(values.startTime, 'HH:mm');
      const nextHour = moment(startTimeMoment).startOf('hour').add(1, 'hour');

      const timesWith15MinIncrement = calculateTimes(
        startTimeMoment,
        nextHour,
        15
      );
      const end = moment(startTimeMoment)
        .startOf('day')
        .add(17, 'hours')
        .add(0, 'minutes');
      const timesAfterStartTime = calculateTimes(nextHour, end, 15);

      const times = [...timesWith15MinIncrement, ...timesAfterStartTime];
      const uniqueTimes = [...new Set(times)];
      setFieldValue('endAtArray', uniqueTimes.slice(1));
    }
  }, [values.startTime, setFieldValue, isEditMode, values.selectedDate]);

  const calculateTimes = (start, end, interval) => {
    const times = [];
    let currentTime = moment(start);
    while (currentTime.isBefore(end) || currentTime.isSame(end, 'minute')) {
      times.push(currentTime.format('HH:mm'));
      currentTime.add(interval, 'minutes');
    }
    return times;
  };

  const handleTimeSelection = (field, e) => {
    const selectedTime = e.target.value;
    setFieldValue(field, selectedTime);
  };
  const validateEndTime = () => {
    return moment(values.endTime, 'HH:mm') > moment(values.startTime, 'HH:mm')
      ? undefined
      : 'End time must be greater than start time';
  };
  return (
    <Flex flexDir={'column'} justifyContent={'flex-start'} gap={'3'}>
      <Field name="startTime">
        {({ field }) => (
          <Select
            {...field}
            placeholder="Select Start Time"
            value={values.startTime}
            onChange={(e) => handleTimeSelection('startTime', e)}
          >
            {values.startAtArray &&
              Array.isArray(values.startAtArray) &&
              values.startAtArray.length > 0 &&
              values.startAtArray.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
          </Select>
        )}
      </Field>
      <ErrorMessage name="startTime" component="div" className="error" />
      <Field name="endTime" validate={validateEndTime}>
        {({ field }) => (
          <Select
            {...field}
            placeholder="Select End Time"
            value={values.endTime}
            onChange={(e) => handleTimeSelection('endTime', e)}
          >
            {values.startAtArray &&
              Array.isArray(values.startAtArray) &&
              values.startAtArray.length > 0 &&
              values.startAtArray.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
          </Select>
        )}
      </Field>
      <ErrorMessage name="endTime" component="div" className="error" />
    </Flex>
  );
};

export default TimePicker;
