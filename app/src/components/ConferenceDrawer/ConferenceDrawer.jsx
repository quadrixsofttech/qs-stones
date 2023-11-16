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
  Tooltip,
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
import { useState } from 'react';
import { InfoIcon } from '@chakra-ui/icons';
import moment from 'moment';

export default function ConferenceDrawer({
  btnRef,
  isOpen,
  onClose,
  isEditMode,
  reservationData,
  refetchReservations,
}) {
  const toast = useToast();

  const { isLoading, createReservation, updateReservation } =
    useConferenceRoomReservation();
  const [selectedDatesArray, setSelectedDatesArray] = useState([]);
  const [valuesForBE, setValuesForBE] = useState([]);

  if (isLoading) {
    return <Spinner />;
  }

  const showToast = (status, description) => {
    toast({
      position: 'top-right',
      status,
      variant: 'subtle',
      duration: 3000,
      isClosable: true,
      description,
    });
  };

  const handleSubmit = async (values) => {
    try {
      let reservationId;
      if (isEditMode) {
        if (!reservationData) {
          return;
        }
        reservationId = reservationData._id;
        await updateReservation(reservationId, valuesForBE);
        showToast('success', 'Reservation updated successfully.');
      } else {
        reservationId = await createReservation(valuesForBE);
        showToast(
          'success',
          `You have successfully reserved ${
            values.confRoomName
          } for the date ${moment(values.selectedDate).format(
            'YYYY-MM-DD'
          )} from ${values.startTime} to ${values.endTime}`
        );
      }
    } catch (error) {
      showToast('error', error.response?.data?.message || 'An error occurred.');
    } finally {
      onClose();
      refetchReservations();
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
          <DrawerHeader>
            {isEditMode ? (
              <>
                Edit Conference Room
                <Tooltip
                  label="*If you want to update all instances, first you must delete the card and then create a new reservation."
                  hasArrow
                  placement="bottom"
                >
                  <InfoIcon color={'gray.400'} ml={2} mb={1} />
                </Tooltip>
              </>
            ) : (
              'Reserve Conference Room'
            )}
          </DrawerHeader>
          <Divider />
          <Formik
            initialValues={initialValues}
            validationSchema={reservationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values }) => (
              <Form>
                <DrawerBody p={0}>
                  <Box p={6}>
                    <PickTimeAndRoom
                      isEditMode={isEditMode}
                      reservationData={reservationData}
                      setValuesForBE={setValuesForBE}
                    />
                  </Box>
                  {!isEditMode && (
                    <>
                      <Divider />
                      <Box p={6}>
                        <CustomSwitch
                          switch_text={'Repeat reservation'}
                          isEditMode={isEditMode}
                        />
                        <GenerateDayOfTheWeek
                          selectedDatesArray={selectedDatesArray}
                          setSelectedDatesArray={setSelectedDatesArray}
                        />
                        <Box mt={3}>
                          <CustomCheckBox
                            checkBox_text={'Every day'}
                            isEditMode={isEditMode}
                          />
                        </Box>
                        <Text
                          fontSize="md"
                          mt={3}
                          color={values.reccuring ? 'gray.700' : 'gray.200'}
                        >
                          Ends
                        </Text>
                        <RadioButtonGroup
                          f_option="Never"
                          s_option="After"
                          t_option="On specific date"
                        />
                      </Box>
                    </>
                  )}
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
                  <Button colorScheme="purple" type="submit">
                    {isEditMode ? 'Update' : 'Submit'}
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
