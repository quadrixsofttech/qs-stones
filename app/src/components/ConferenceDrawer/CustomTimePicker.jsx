import React, { useEffect } from 'react';
import { Select, VStack } from '@chakra-ui/react';
import moment from 'moment';

const TimePicker = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  startTimes,
  setStartTimes,
  endTimes,
  setEndTimes,
}) => {
 
  useEffect(() => {
    const now = moment();
    const start = moment(now).startOf('day').add(8, 'hours');
    const end = moment(now).startOf('day').add(17, 'hours');
    const times = calculateTimes(start, end, 15);
    setStartTimes(times.filter((time) => moment(time, 'HH:mm').isAfter(now)));
  }, []);

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
      setEndTimes(times.slice(1));
      setEndTime('');
    }
  }, [startTime]);

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

  return (
    <VStack spacing={4} direction="row">
      <Select
        placeholder="Select Start Time"
        value={startTime}
        onChange={handleStartTimeSelection}
      >
        {startTimes.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Select End Time"
        value={endTime}
        onChange={handleEndTimeSelection}
      >
        {endTimes.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </Select>
    </VStack>
  );
};

export default TimePicker;
