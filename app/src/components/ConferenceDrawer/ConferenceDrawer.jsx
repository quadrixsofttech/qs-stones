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
  Spinner,
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
import { useConferenceRoomReservation } from '../../hooks/useConferenceRoomReservation.js';

export default function ConferenceDrawer({
  btnRef,
  isOpen,
  onClose,
  reservationData,
  isEditMode,
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

  const { createReservation, updateReservation, isLoading } =
    useConferenceRoomReservation();

  const toast = useToast();

  const handleEveryDayCheck = () => {
    setEveryDayChecked(!everyDayChecked);
  };

  useEffect(() => {
    if (reservationData && isEditMode) {
      setFormData({
        title: reservationData.title,
        description: reservationData.description,
        startTime: reservationData.startTime,
        endTime: reservationData.endTime,
        column: reservationData.column,
      });
    }
  }, [reservationData, isEditMode]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleSave = () => {
    onClose();
    toast({
      position: 'top-right',
      status: 'success',
      variant: 'subtle',
      description: `You have successfully reserved ${selectedConference} for the date
      ${selectedDate.format('YYYY/MM/dd')} from ${startTime} to ${endTime}`,
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
            initialValues={isEditMode ? initialValues : formData}
            validationSchema={reservationSchema}
            onSubmit={async (values) => {
              try {
                if (isEditMode) {
                  await updateReservation(reservationData.id, values);
                } else {
                  await createReservation(values);
                }
                onClose();
              } catch (error) {
                console.error(error);
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
                      selectedDate={selectedDate}
                      startTime={startTime}
                      setStartTime={setStartTime}
                      endTime={endTime}
                      setEndTime={setEndTime}
                      startTimes={startTimes}
                      setStartTimes={setStartTimes}
                      endTimes={endTimes}
                      setEndTimes={setEndTimes}
                      isEditMode={isEditMode}
                      formData={formData}
                    />
                  </Box>
                  <Divider />
                  <Box p={6}>
                    <CustomSwitch
                      setSwitchIsChecked={setSwitchIsChecked}
                      switch_text={'Repeat reservation'}
                      isEditMode={isEditMode}
                      formData={formData}
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
                        isEditMode={isEditMode}
                        formData={formData}
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
                    <CardInfo formData={formData} isEditMode={isEditMode} />
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
