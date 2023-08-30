import React, { useEffect } from 'react';
import { Flex, Select } from '@chakra-ui/react';
import moment from 'moment';
import { ErrorMessage, Field, useFormikContext } from 'formik';

const TimePicker = () => {
  const { values, setFieldValue } = useFormikContext();
  useEffect(() => {
    const start = moment(values.selectedDate).startOf('day').add(8, 'hours');
    const end = moment(values.selectedDate).startOf('day').add(17, 'hours');

    if (
      values.selectedDate.format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD')
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
    }
  }, [values.selectedDate, setFieldValue]);

  useEffect(() => {
    if (values.startAt) {
      const startTimeMoment = moment(values.startAt, 'HH:mm');

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
  }, [values.startAt, setFieldValue]);

  const calculateTimes = (start, end, interval) => {
    const times = [];
    let currentTime = moment(start);
    while (currentTime.isBefore(end) || currentTime.isSame(end, 'minute')) {
      times.push(currentTime.format('HH:mm'));
      currentTime.add(interval, 'minutes');
    }
    return times;
  };

  const handleStartTimeSelection = (e) => {
    setFieldValue('startAt', e.target.value);
  };

  const handleEndTimeSelection = (e) => {
    setFieldValue('endAt', e.target.value);
  };

  return (
    <Flex flexDir={'column'} justifyContent={'flex-start'} gap={'3'}>
      <Field name="startAt">
        {({ field }) => (
          <Select
            placeholder="Select Start Time"
            value={values.startAt}
            onChange={handleStartTimeSelection}
          >
            {Object.values(values.startAtArray).map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Select>
        )}
      </Field>
      <ErrorMessage name="startAt" component="div" className="error" />
      <Field name="endAt">
        {({ field }) => (
          <Select
            placeholder="Select End Time"
            value={values.endAt}
            onChange={handleEndTimeSelection}
          >
            {Object.values(values.endAtArray).map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Select>
        )}
      </Field>
      <ErrorMessage name="endAt" component="div" className="error" />
    </Flex>
  );
};

export default TimePicker;
