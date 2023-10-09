import { Box, Select, Spinner } from '@chakra-ui/react';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import CustomDatePicker from './CustomDatePicker';
import TimePicker from './CustomTimePicker';
import useConference from '../../hooks/useConference';

const PickTimeAndRoom = ({ isEditMode, reservationData }) => {
  const { conferenceRooms, conferenceLoading } = useConference();

  const { values, setFieldValue } = useFormikContext();

  const {
    title,
    description,
    startTime,
    endTime,
    // selectedDaysInTheWeek,
    column,
    floor,
    date,
    markerColor,
  } = reservationData;

  useEffect(() => {
    if (isEditMode) {
      setFieldValue('floor', floor);
      setFieldValue('column', column);
      setFieldValue('selectedDate', date);
      setFieldValue('startTime', startTime);
      setFieldValue('endTime', endTime);
      setFieldValue('title', title);
      setFieldValue('description', description);
      setFieldValue('markerColor', markerColor);
      // setFieldValue('selectedDaysInTheWeek', selectedDaysInTheWeek);
    }
  }, [
    isEditMode,
    floor,
    column,
    date,
    startTime,
    endTime,
    title,
    description,
    markerColor,
    setFieldValue,
    // selectedDaysInTheWeek,
  ]);
  if (conferenceLoading || !conferenceRooms) {
    return <Spinner />;
  }

  // console.log(values);

  const floors = ['Upper Floor', 'Lower Floor'];

  const handleFloorChange = (e) => {
    setFieldValue('floor', e.target.value);
  };

  // console.log(values);

  const filteredConferenceRooms =
    values.floor === 'Upper Floor'
      ? conferenceRooms.filter((room) => room.floor === 'Upper Floor')
      : conferenceRooms.filter((room) => room.floor === 'Lower Floor');

  return (
    <>
      <Box mb={2}>Choose a floor</Box>
      <Field name="selectedFloor">
        {({ field }) => (
          <Select
            size="md"
            {...field}
            onChange={handleFloorChange}
            value={isEditMode ? values.floor : 'Upper Floor'}
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
            value={isEditMode ? values.column : 'Collaboration Room'}
            onChange={(e) => {
              const newValue = e.target.value;
              field.onChange(e);
              setFieldValue('column', newValue);
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
      <CustomDatePicker name="date-picker" isEditMode={isEditMode} />
      <Box mb={2} mt={3}>
        Select meeting time:
      </Box>
      <TimePicker isEditMode={isEditMode} />
    </>
  );
};

export default PickTimeAndRoom;
