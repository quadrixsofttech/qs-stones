import { Box, Select, Spinner } from '@chakra-ui/react';
import { ErrorMessage, Field } from 'formik';
import React, { useState } from 'react';
import CustomDatePicker from './CustomDatePicker';
import TimePicker from './CustomTimePicker';
import useConference from '../../hooks/useConference';

const PickTimeAndRoom = ({
  setSelectedConference,
  setSelectedDate,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  startTimes,
  setStartTimes,
  endTimes,
  setEndTimes,
}) => {
  const [floor, setFloor] = useState('Upper Floor');
  const { conferenceRooms, conferenceLoading } = useConference();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  if (conferenceLoading || !conferenceRooms) {
    return <Spinner />;
  }

  const floors = ['Upper Floor', 'Lower Floor'];

  const handleFloorChange = (e) => {
    setFloor(e.target.value);
  };

  const filteredConferenceRooms =
    floor === 'Upper Floor'
      ? conferenceRooms?.filter((room) => room.floor === 'Upper Floor')
      : conferenceRooms?.filter((room) => room.floor === 'Lower Floor');

  return (
    <>
      <Box mb={2}>Choose a floor</Box>
      <Field name="selectedFloor">
        {({ field }) => (
          <Select
            size="md"
            {...field}
            onChange={handleFloorChange}
            value={field.value}
          >
            {floors.map((floor) => (
              <option key={floor} value={floor}>
                {floor}
              </option>
            ))}
          </Select>
        )}
      </Field>
      <ErrorMessage name="selectedFloor" component="div" className="error" />

      <Box mb={2} mt={3}>
        Choose a conference room
      </Box>
      <Field name="conferenceRoom">
        {({ field }) => (
          <Select
            size="md"
            {...field}
            value={field.value}
            onChange={(e) => {
              field.onChange(e);
              setSelectedConference(e.target.value);
            }}
          >
            {filteredConferenceRooms.map((room) => (
              <option key={room.id} value={room.name}>
                {room.name}
              </option>
            ))}
          </Select>
        )}
      </Field>
      <ErrorMessage name="conferenceRoom" component="div" className="error" />
      <Box mb={2} mt={3}>
        Select date:
      </Box>
      <Field name="date">
        {({ field }) => (
          <CustomDatePicker
            format={'MM/DD/YYYY'}
            field={field}
            name="date-picker"
            onDateChange={handleDateChange}
          />
        )}
      </Field>
      <ErrorMessage name="date" component="div" className="error" />
      <Box mb={2} mt={3}>
        Select meeting time:
      </Box>
      <Field name="startTime">
        {({ field }) => (
          <TimePicker
            {...field}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            startTimes={startTimes}
            setStartTimes={setStartTimes}
            endTimes={endTimes}
            setEndTimes={setEndTimes}
          />
        )}
      </Field>
      <ErrorMessage name="startEndTime" component="div" className="error" />
    </>
  );
};

export default PickTimeAndRoom;
