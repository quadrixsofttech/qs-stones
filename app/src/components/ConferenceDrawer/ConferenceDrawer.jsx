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

import GenerateDayOfTheWeek from './GenerateDayOfTheWeek/GenerateDayOfTheWeek';
import RadioButtonGroup from './RadioButtonGroup';
import GenerateMarkerColor from './GenerateMarkerColor/GenerateMarkerColor';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PickTimeAndRoom from './PickTimeAndRoom/PickTimeAndRoom';
import CustomSwitch from './CustomSwitch';
import CustomCheckBox from './CustomCheckBox';
import CardInfo from './CardInfo';

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
                    <PickTimeAndRoom
                      selectedConference={selectedConference}
                      setSelectedConference={setSelectedConference}
                    />
                  </Box>
                  <Divider />
                  <Box p={6}>
                    <CustomSwitch setSwitchIsChecked={setSwitchIsChecked} />
                    <GenerateDayOfTheWeek
                      switchIsChecked={switchIsChecked}
                      everyDayChecked={everyDayChecked}
                      setEveryDayChecked={setEveryDayChecked}
                    />
                    <Box mt={3}>
                      <CustomCheckBox
                        handleEveryDayCheck={handleEveryDayCheck}
                        switchIsChecked={switchIsChecked}
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
