import { Box, Select, Spinner } from '@chakra-ui/react';
import { ErrorMessage, Field } from 'formik';
import React, { useState } from 'react';
import CustomDatePicker from './CustomDatePicker';
import CustomTimePicker from './CustomTimePicker';
import useConference from '../../hooks/useConference';

const PickTimeAndRoom = ({
  setSelectedConference,
  setSelectedDate,
  setSelectedStartTime,
  setSelectedEndTime,
}) => {
  const [floor, setFloor] = useState('Upper Floor');
  const { data: conferenceRooms, conferenceLoading } = useConference();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (time) => {
    setSelectedStartTime(time.format('HH:mm'));
  };

  const handleEndTimeChange = (time) => {
    setSelectedEndTime(time.format('HH:mm'));
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
      ? conferenceRooms.filter((room) => room.floor === 'Upper Floor')
      : conferenceRooms.filter((room) => room.floor === 'Lower Floor');

  return (
    <>
      <Box mb={2}>Choose a floor</Box>
      <Field name="floor">
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
      <ErrorMessage name="floor" component="div" className="error" />

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
        Start at time:
      </Box>
      <Field name="startTime">
        {({ field }) => (
          <CustomTimePicker
            field={field}
            switchIsChecked={true}
            name="start-time-picker"
            onTimeChange={handleStartTimeChange}
          />
        )}
      </Field>
      <ErrorMessage name="startTime" component="div" className="error" />
      <Box mb={2} mt={3}>
        End at time:
      </Box>
      <Field name="endTime">
        {({ field }) => (
          <CustomTimePicker
            field={field}
            switchIsChecked={true}
            name="end-time-picker"
            onTimeChange={handleEndTimeChange}
          />
        )}
      </Field>
      <ErrorMessage name="endTime" component="div" className="error" />
    </>
  );
};

export default PickTimeAndRoom;
