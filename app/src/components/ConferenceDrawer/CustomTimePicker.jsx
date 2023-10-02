import React, { useEffect } from 'react';
import { Flex, Select } from '@chakra-ui/react';
import moment from 'moment';
import { ErrorMessage, Field, useFormikContext } from 'formik';

const TimePicker = ({ isEditMode, formData, setFormData }) => {
  const { values, setFieldValue } = useFormikContext();

  // console.log(formData);

  // console.log(
  //   'Form datastart time and end time',
  //   formData.startTime,
  //   formData.endTime
  // );
  // console.log(isEditMode);
  // console.log('values', values.startTime, values.endTime);
  console.log('FormData:', formData);
  console.log('Values:', values);
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

  const handleStartTimeSelection = (e) => {
    setFieldValue('startTime', e.target.value);
    setFormData({ ...formData, startTime: e.target.value });
  };

  const handleEndTimeSelection = (e) => {
    setFieldValue('endTime', e.target.value);
    setFormData({ ...formData, endTime: e.target.value });
  };

  return (
    <Flex flexDir={'column'} justifyContent={'flex-start'} gap={'3'}>
      <Field name="startTime">
        {({ field }) => (
          <Select
            placeholder="Select Start Time"
            value={isEditMode ? formData.startTime : values.startTime}
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
      <ErrorMessage name="startTime" component="div" className="error" />
      <Field name="endTime">
        {({ field }) => (
          <Select
            placeholder="Select End Time"
            value={isEditMode ? formData.endTime : values.endTime}
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
      <ErrorMessage name="endTime" component="div" className="error" />
    </Flex>
  );
};

export default TimePicker;
