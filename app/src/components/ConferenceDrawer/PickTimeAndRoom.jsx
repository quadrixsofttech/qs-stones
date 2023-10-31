import { Box, Select, Spinner } from '@chakra-ui/react';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import CustomDatePicker from './CustomDatePicker';
import TimePicker from './CustomTimePicker';
import useConference from '../../hooks/useConference';
import useUser from './../../hooks/useUser';
import moment from 'moment';

const PickTimeAndRoom = ({ isEditMode, reservationData, setValuesForBE }) => {
  const { conferenceRooms, conferenceLoading } = useConference();
  const { user } = useUser();

  const { values, setFieldValue } = useFormikContext();

  const {
    title,
    description,
    startTime,
    endTime,
    meetingRepetition,
    numberOfOccurences,
    column,
    floor,
    date,
    selectedDateFromInput,
    markerColor,
  } = reservationData;

  useEffect(() => {
    setFieldValue('userId', user._id);
    setValuesForBE({
      conferenceRoom: values.column,
      date: moment(values.selectedDate).format('YYYY-MM-DD'),
      startTime: values.startTime,
      endTime: values.endTime,
      selectedDatesInDays: values.selectedDatesInDays,
      title: values.title,
      description: values.description,
      color: values.markerColor,
      userId: values.userId,
    });
  }, [
    user._id,
    setFieldValue,
    setValuesForBE,
    values.selectedDate,
    values.column,
    values.startTime,
    values.selectedDatesInDays,
    values.endTime,
    values.title,
    values.markerColor,
    values.userId,
    values.description,
  ]);

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
    }
  }, [
    isEditMode,
    floor,
    column,
    date,
    startTime,
    endTime,
    meetingRepetition,
    numberOfOccurences,
    title,
    description,
    selectedDateFromInput,
    markerColor,
    user._id,
    setFieldValue,
  ]);

  if (conferenceLoading || !conferenceRooms) {
    return <Spinner />;
  }

  console.log(values);

  const floors = ['Upper Floor', 'Lower Floor'];

  const handleFloorChange = (e) => {
    setFieldValue('floor', e.target.value);
  };

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
            value={values.floor}
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
            value={values.conferenceRoom}
            onChange={(e) => {
              const selectedRoomId = e.target.value;
              const selectedRoom = filteredConferenceRooms.find(
                (room) => room._id === selectedRoomId
              );
              const roomName = selectedRoom ? selectedRoom.name : '';
              field.onChange(e);
              setFieldValue('confRoomName', roomName);
              setFieldValue('column', selectedRoomId);
            }}
          >
            {filteredConferenceRooms.map((room) => (
              <option key={room.id} value={room._id}>
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
