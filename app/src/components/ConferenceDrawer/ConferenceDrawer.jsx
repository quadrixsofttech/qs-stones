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
import { Formik, Form } from 'formik';
import PickTimeAndRoom from './PickTimeAndRoom';
import CustomSwitch from './CustomSwitch';
import CustomCheckBox from './CustomCheckBox';
import CardInfo from './CardInfo';
import { reservationSchema, initialValues } from './formikConfig';
import { useConferenceRoomReservation } from '../../hooks/useConferenceRoomReservation';

export default function ConferenceDrawer({
  btnRef,
  isOpen,
  onClose,
  isEditMode,
  reservationData,
}) {
  const toast = useToast();

  const { isLoading, updateReservation } = useConferenceRoomReservation();

  if (isLoading) {
    return <Spinner />;
  }

  const handleSubmit = (values, errors) => {
    onClose();
    console.log(errors);
    toast({
      position: 'top-right',
      status: 'success',
      variant: 'subtle',
      description: `You have successfully reserved ${
        values.conferenceRoom
      } for the date
      ${values.selectedDate.format('YYYY/MM/DD')} from ${values.startTime} to ${
        values.endTime
      }`,
    });
  };

  const handleFormikOnSubmit = async (values) => {
    try {
      if (isEditMode) {
        await updateReservation(reservationData.id, values);
      } else {
        // await createReservation(values);
        handleSubmit();
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
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
            onSubmit={handleFormikOnSubmit}
          >
            {({ values }) => (
              <Form>
                <DrawerBody p={0}>
                  <Box p={6}>
                    <PickTimeAndRoom
                      isEditMode={isEditMode}
                      reservationData={reservationData}
                    />
                  </Box>
                  <Divider />
                  <Box p={6}>
                    <CustomSwitch
                      switch_text={'Repeat reservation'}
                      isEditMode={isEditMode}
                    />
                    <GenerateDayOfTheWeek />
                    <Box mt={3}>
                      <CustomCheckBox
                        checkBox_text={'Every day'}
                        isEditMode={isEditMode}
                      />
                    </Box>
                    <Text
                      fontSize="md"
                      mt={3}
                      color={values.repeatReservation ? 'gray.700' : 'gray.200'}
                    >
                      Ends
                    </Text>
                    <RadioButtonGroup
                      f_option="Never"
                      s_option="After"
                      t_option="On specific date"
                    />
                  </Box>
                  <Divider />
                  <Box p={6}>
                    <CardInfo isEditMode={isEditMode} />
                  </Box>
                </DrawerBody>

                <Divider />
                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="purple" type="submit">
                    Submit
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
