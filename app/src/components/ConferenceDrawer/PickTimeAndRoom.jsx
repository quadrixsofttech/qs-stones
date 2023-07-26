import { Box, Select } from '@chakra-ui/react';
import { ErrorMessage, Field } from 'formik';
import React from 'react';
import CustomDatePicker from './CustomDatePicker';
import FloorTypes from '../../constants/FloorTypes';
import ConferenceRooms from '../../constants/ConferenceRooms';

const PickTimeAndRoom = ({ selectedConference, setSelectedConference }) => {
  return (
    <>
      <Box mb={2}>Choose a floor</Box>
      <Field name="floor">
        {({ field }) => (
          <Select size="md" {...field}>
            {Object.values(FloorTypes).map((type, index) => (
              <option value={type} key={index}>
                {type}
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
            value={selectedConference}
            onChange={(e) => setSelectedConference(e.target.value)}
          >
            {Object.values(ConferenceRooms).map((type, index) => (
              <option value={type} key={index}>
                {type}
              </option>
            ))}
          </Select>
        )}
      </Field>
      <ErrorMessage name="conferenceRoom" component="div" className="error" />
      <Box mb={2} mt={3}>
        Start at:
      </Box>
      <Field name="startAt">
        {({ field }) => <CustomDatePicker format={'MM/DD/YYYY'} {...field} />}
      </Field>
      <ErrorMessage name="startAt" component="div" className="error" />

      <Box mb={2} mt={3}>
        End at:
      </Box>
      <Field name="endAt">
        {({ field }) => <CustomDatePicker format={'MM/DD/YYYY'} {...field} />}
      </Field>
      <ErrorMessage name="endAt" component="div" className="error" />
    </>
  );
};

export default PickTimeAndRoom;
