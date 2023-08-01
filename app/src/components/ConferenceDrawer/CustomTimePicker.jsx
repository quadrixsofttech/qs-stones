import React, { useState, useEffect } from 'react';
import { Select, VStack } from '@chakra-ui/react';
import moment from 'moment';

const TimePicker = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startTimes, setStartTimes] = useState([]);
  const [endTimes, setEndTimes] = useState([]);

  useEffect(() => {
    // Calculate times for the first select based on current time
    const now = moment();
    const start = moment(now).startOf('day').add(8, 'hours');
    const end = moment(now).startOf('day').add(17, 'hours');
    const times = calculateTimes(start, end, 5);
    setStartTimes(times.filter((time) => moment(time, 'HH:mm').isAfter(now)));
  }, []);

  useEffect(() => {
    // Calculate times for the second select based on the selected start time
    if (startTime) {
      const startTimeMoment = moment(startTime, 'HH:mm');
      const end = moment(startTimeMoment).startOf('day').add(17, 'hours');
      const times = calculateTimes(startTimeMoment, end, 15);
      setEndTimes(times);
      setEndTime('');
    }
  }, [startTime]);

  // Function to calculate times with a given interval between start and end time
  const calculateTimes = (start, end, interval) => {
    const times = [];
    let currentTime = moment(start);
    while (currentTime.isSameOrBefore(end)) {
      times.push(currentTime.format('HH:mm'));
      currentTime.add(interval, 'minutes');
    }
    return times;
  };

  // Function to handle start time selection
  const handleStartTimeSelection = (e) => {
    setStartTime(e.target.value);
  };

  // Function to handle end time selection
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
