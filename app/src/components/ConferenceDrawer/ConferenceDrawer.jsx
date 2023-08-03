import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';

import GenerateDayOfTheWeek from './GenerateDayOfTheWeek/GenerateDayOfTheWeek';
import RadioButtonGroup from './RadioButtonGroup';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import PickTimeAndRoom from './PickTimeAndRoom';
import CustomSwitch from './CustomSwitch';
import CustomCheckBox from './CustomCheckBox';
import CardInfo from './CardInfo';
import { reservationSchema, initialValues } from './formikConfig';
import moment from 'moment';
import axios from 'axios';

export default function ConferenceDrawer({
  btnRef,
  isOpen,
  onClose,
  reservationData,
}) {
  const [switchIsChecked, setSwitchIsChecked] = useState(false);
  const [everyDayChecked, setEveryDayChecked] = useState(false);
  const [selectedConference, setSelectedConference] = useState('');
  const [selectedDate, setSelectedDate] = useState(moment());

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startTimes, setStartTimes] = useState([]);
  const [endTimes, setEndTimes] = useState([]);
  const [formData, setFormData] = useState(initialValues);

  const toast = useToast();

  const handleEveryDayCheck = () => {
    setEveryDayChecked(!everyDayChecked);
  };

  useEffect(() => {
    if (reservationData) {
      setFormData({
        title: reservationData.title,
        description: reservationData.description,
        start: reservationData.start,
        end: reservationData.end,
        column: reservationData.column,
      });
    }
  }, [reservationData]);

  const handleSave = () => {
    onClose();
    // toast({
    //   position: 'top-right',
    //   status: 'success',
    //   variant: 'subtle',
    //   description: `You have successfully reserved ${selectedConference} for the date
    //   ${selectedDate.format('YYYY/MM/dd')} from ${startTime} to ${endTime}`,
    // });
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
            initialValues={formData}
            validationSchema={reservationSchema}
            onSubmit={async (values) => {
              try {
                const response = await axios.put(
                  `/api/v1/conference-rooms/reservations/${reservationData.id}`,
                  values
                );
                handleSave();
                toast({
                  position: 'top-right',
                  status: 'success',
                  variant: 'subtle',
                  description: `Reservation updated successfully.`,
                });
              } catch (error) {
                console.error(error.message);
                toast({
                  position: 'top-right',
                  status: 'error',
                  variant: 'subtle',
                  description: `Failed to update reservation. Please try again.`,
                });
              }
            }}
          >
            {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <DrawerBody p={0}>
                  <Box p={6}>
                    <PickTimeAndRoom
                      setSelectedConference={setSelectedConference}
                      setSelectedDate={setSelectedDate}
                      startTime={values.startTime}
                      setStartTime={setFieldValue}
                      endTime={values.endTime}
                      setEndTime={setFieldValue}
                      startTimes={startTimes}
                      setStartTimes={setStartTimes}
                      endTimes={endTimes}
                      setEndTimes={setEndTimes}
                    />
                  </Box>
                  <Divider />
                  <Box p={6}>
                    <CustomSwitch
                      setSwitchIsChecked={setSwitchIsChecked}
                      switch_text={'Repeat reservation'}
                    />
                    <GenerateDayOfTheWeek
                      switchIsChecked={switchIsChecked}
                      everyDayChecked={everyDayChecked}
                      setEveryDayChecked={setEveryDayChecked}
                    />
                    <Box mt={3}>
                      <CustomCheckBox
                        handleEveryDayCheck={handleEveryDayCheck}
                        switchIsChecked={switchIsChecked}
                        checkBox_text={'Every day'}
                      />
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
                    <CardInfo />
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
