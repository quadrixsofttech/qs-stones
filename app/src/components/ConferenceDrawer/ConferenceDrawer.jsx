import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Select,
  Switch,
  Text,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import FloorTypes from '../../constants/FloorTypes';
import ConferenceRooms from '../../constants/ConferenceRooms';
import GenerateDayOfTheWeek from './GenerateDayOfTheWeek/GenerateDayOfTheWeek';
import RadioButtonGroup from './RadioButtonGroup';
import GenerateMarkerColor from './GenerateMarkerColor/GenerateMarkerColor';
import { useState } from 'react';
import CustomDatePicker from './CustomDatePicker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const reservationSchema = Yup.object().shape({
  floor: Yup.string().required('Floor is required'),
  conferenceRoom: Yup.string().required('Conference room is required'),
  startAt: Yup.date().required('Start time is required'),
  endAt: Yup.date().required('End time is required'),
  title: Yup.string().required('Title is required'),
});

export default function ConferenceDrawer({ btnRef, isOpen, onClose }) {
  const [switchIsChecked, setSwitchIsChecked] = useState(false);
  const [everyDayChecked, setEveryDayChecked] = useState(false);
  const [selectedConference, setSelectedConference] =
    useState('01 Conference Room');

  const toast = useToast();

  const handleEveryDayCheck = () => {
    setEveryDayChecked(!everyDayChecked);
  };

  const handleSave = () => {
    onClose();
    toast({
      position: 'top-right',
      status: 'success',
      variant: 'subtle',
      description: `You have successfully reserved ${selectedConference}`,
    });
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'sm'}
      >
        <DrawerOverlay />
        <DrawerContent overflowY={'auto'}>
          <DrawerCloseButton />
          <DrawerHeader>Reserve Conference Room</DrawerHeader>
          <Divider />
          <Formik
            initialValues={{
              floor: '',
              conferenceRoom: '',
              startAt: '',
              endAt: '',
              repeatReservation: false,
              everyDay: false,
              title: '',
              description: '',
              markerColor: '',
            }}
            validationSchema={reservationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <DrawerBody p={0}>
                  <Box p={6}>
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
                    <ErrorMessage
                      name="floor"
                      component="div"
                      className="error"
                    />

                    <Box mb={2} mt={3}>
                      Choose a conference room
                    </Box>
                    <Field name="conferenceRoom">
                      {({ field }) => (
                        <Select
                          size="md"
                          {...field}
                          value={selectedConference}
                          onChange={(e) =>
                            setSelectedConference(e.target.value)
                          }
                        >
                          {Object.values(ConferenceRooms).map((type, index) => (
                            <option value={type} key={index}>
                              {type}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="conferenceRoom"
                      component="div"
                      className="error"
                    />

                    <Box mb={2} mt={3}>
                      Start at:
                    </Box>
                    <Field name="startAt">
                      {({ field }) => (
                        <CustomDatePicker
                          format={'MM/DD/YYYY HH:mm'}
                          {...field}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="startAt"
                      component="div"
                      className="error"
                    />

                    <Box mb={2} mt={3}>
                      End at:
                    </Box>
                    <Field name="endAt">
                      {({ field }) => (
                        <CustomDatePicker
                          format={'MM/DD/YYYY HH:mm'}
                          {...field}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="endAt"
                      component="div"
                      className="error"
                    />
                  </Box>
                  <Divider />
                  <Box p={6}>
                    <Field name="repeatReservation">
                      {({ field }) => (
                        <FormControl display="flex" alignItems="center">
                          <Switch
                            {...field}
                            colorScheme="purple"
                            isChecked={field.value}
                            onChange={(event) => {
                              const { checked } = event.target;
                              setSwitchIsChecked(checked);
                              field.onChange(event);
                            }}
                          />
                          <FormLabel htmlFor="reservation" mb="0" ml={3}>
                            Repeat reservation
                          </FormLabel>
                        </FormControl>
                      )}
                    </Field>
                    <GenerateDayOfTheWeek
                      switchIsChecked={switchIsChecked}
                      everyDayChecked={everyDayChecked}
                      setEveryDayChecked={setEveryDayChecked}
                    />
                    <Box mt={3}>
                      <Field name="everyDay">
                        {({ field }) => (
                          <Checkbox
                            colorScheme="purple"
                            isDisabled={switchIsChecked ? false : true}
                            isChecked={field.value}
                            onChange={() => {
                              const { checked } = field;
                              handleEveryDayCheck();
                              field.onChange(!checked);
                            }}
                          >
                            Every day
                          </Checkbox>
                        )}
                      </Field>
                    </Box>

                    <Text
                      fontSize="md"
                      mt={3}
                      color={switchIsChecked ? 'gray.700' : 'gray.200'}
                    >
                      Ends
                    </Text>
                    <RadioButtonGroup
                      switchIsChecked={switchIsChecked}
                      f_option="Never"
                      s_option="After"
                      t_option="On specific date"
                    />
                  </Box>
                  <Divider />
                  <Box p={6}>
                    <Text fontSize="md" mb={1} fontWeight={'400'}>
                      Title
                    </Text>
                    <Field name="title">
                      {({ field }) => (
                        <Input
                          {...field}
                          placeholder="Please enter a title..."
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="error"
                    />

                    <Text fontSize="md" mb={1} fontWeight={'400'} mt={3}>
                      Description
                    </Text>
                    <Field name="description">
                      {({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Please enter a description..."
                          h={'20'}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="error"
                    />
                    <Text mt={3} fontSize="md">
                      Choose marker color
                    </Text>
                    <Field name="markerColor" component={GenerateMarkerColor} />
                    <ErrorMessage
                      name="markerColor"
                      component="div"
                      className="error"
                    />
                  </Box>
                </DrawerBody>

                <Divider />
                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="purple" onClick={handleSave}>
                    Save
                  </Button>
                </DrawerFooter>
              </Form>
            )}
          </Formik>
        </DrawerContent>
      </Drawer>
    </>
  );
}
