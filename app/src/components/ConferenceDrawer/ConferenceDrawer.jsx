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
import { useState } from 'react';
import { Formik, Form } from 'formik';
import PickTimeAndRoom from './PickTimeAndRoom';
import CustomSwitch from './CustomSwitch';
import CustomCheckBox from './CustomCheckBox';
import CardInfo from './CardInfo';
import { reservationSchema, initialValues } from './formikConfig';

export default function ConferenceDrawer({ btnRef, isOpen, onClose }) {
  const [switchIsChecked, setSwitchIsChecked] = useState(false);
  const [everyDayChecked, setEveryDayChecked] = useState(false);
  const [selectedConference, setSelectedConference] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

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
      description: `You have successfully reserved ${selectedConference} for the date ${selectedDate}`,
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
            initialValues={initialValues}
            validationSchema={reservationSchema}
            onSubmit={(values) => {
              handleSave();
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
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
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
