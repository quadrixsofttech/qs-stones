import { Box, Select, Spinner } from '@chakra-ui/react';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import React from 'react';
import CustomDatePicker from './CustomDatePicker';
import TimePicker from './CustomTimePicker';
import useConference from '../../hooks/useConference';

const PickTimeAndRoom = ({ isEditMode, formData, setFormData }) => {
  const { conferenceRooms, conferenceLoading } = useConference();

  const { values, setFieldValue } = useFormikContext();

  console.log('VALUES:', values);
  console.log(formData);

  if (conferenceLoading || !conferenceRooms) {
    return <Spinner />;
  }

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
            value={isEditMode ? formData.floor : values.selectedFloor}
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
            value={isEditMode ? formData.column : values.column}
            onChange={(e) => {
              field.onChange(e);
              setFieldValue('conferenceRoom', e.target.value);
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
      <CustomDatePicker
        name="date-picker"
        formData={formData}
        isEditMode={isEditMode}
      />
      <Box mb={2} mt={3}>
        Select meeting time:
      </Box>
      <TimePicker
        isEditMode={isEditMode}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};

export default PickTimeAndRoom;
