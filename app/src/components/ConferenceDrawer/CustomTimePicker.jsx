import React, { useEffect } from 'react';
import { Select, VStack } from '@chakra-ui/react';
import moment from 'moment';
import workingHours from '../../constants/WorkingDayHours';

const TimePicker = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  startTimes,
  setStartTimes,
  endTimes,
  setEndTimes,
  selectedDate,
  formData,
  isEditMode,
}) => {
  useEffect(() => {
    const now = moment();
    const start = moment(selectedDate).startOf('day').add(8, 'hours');
    const end = moment(selectedDate).startOf('day').add(17, 'hours');

    if (!moment(selectedDate).isSame(now, 'day')) {
      start.set('date', moment(selectedDate).date());
      end.set('date', moment(selectedDate).date());
    }

    const times = calculateTimes(start, end, 15);

    if (moment(selectedDate).isSame(now, 'day')) {
      const currentTime = now.clone().startOf('hour').add(1, 'hour');
      const nearestTimes = times.filter((time) =>
        moment(time, 'HH:mm').isSameOrAfter(currentTime)
      );

      setStartTimes(nearestTimes);
    } else {
      setStartTimes(times);
    }
  }, [selectedDate, setStartTimes]);

  useEffect(() => {
    if (startTime) {
      const startTimeMoment = moment(startTime, 'HH:mm');

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
      setEndTimes(uniqueTimes.slice(1));
      setEndTime('');
    }
  }, [startTime, setEndTime, setEndTimes]);

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
    setStartTime(e.target.value);
  };

  const handleEndTimeSelection = (e) => {
    setEndTime(e.target.value);
  };
  // console.log(formData.startTime);
  console.log('start time:', startTime);
  console.log(isEditMode);

  return (
    <VStack spacing={4} direction="row">
      <Select
        placeholder="Select Start Time"
        value={isEditMode ? formData.startTime : startTime}
        onChange={handleStartTimeSelection}
      >
        {workingHours.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Select End Time"
        value={isEditMode ? formData.endTime : endTime}
        onChange={handleEndTimeSelection}
      >
        {workingHours.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </Select>
    </VStack>
  );
};

export default TimePicker;
