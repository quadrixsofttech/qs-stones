import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
} from '@chakra-ui/react';
import styles from './RequestPTOModal.styles';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Calendar } from 'react-multi-date-picker';
import { useState } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { BiUserPin } from 'react-icons/bi';
import RenderDates from './RenderDates';

export const RequestPTOModal = ({ isOpen, onRequestSubmit, onClose }) => {
  const [isCurrentPageRemote, setIsCurrentPageRemote] = useState(true);

  const [RemoteDates, setRemoteDates] = useState([]);
  const [VacationDates, setVacationDates] = useState([]);

  // Handler to update the start and end dates
  const handleRemoteDates = (selectedDates) => {
    setRemoteDates(selectedDates.format);
  };
  const handleVacationDates = (selectedDates) => {
    setVacationDates(selectedDates);
  };
  const removeRemoteTag = (x) => {
    setRemoteDates(RemoteDates.filter((element) => element !== x));
  };
  const removeVacationTag = (x) => {
    setVacationDates(VacationDates.filter((element) => element !== x));
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent {...styles.modalContent}>
        <Scrollbars style={{ height: '100%' }}>
          <ModalHeader {...styles.modalHeader}>Paid Time Off</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody maxH="600px">
            <Flex {...styles.progress}>
              <Box>1/2</Box>
              <Progress hasStripe value={22} flex={1} colorScheme="purple" />
            </Flex>
            <Flex alignItems="center" justifyContent="center">
              <Calendar
                range
                numberOfMonths={2}
                multiple
                onChange={
                  isCurrentPageRemote ? handleRemoteDates : handleVacationDates
                }
                value={isCurrentPageRemote ? RemoteDates : VacationDates}
                className="custom-calendar"
              />
            </Flex>
            <RenderDates
              remotePage={isCurrentPageRemote}
              remoteDates={RemoteDates}
              vacationDates={VacationDates}
              handleClose={
                isCurrentPageRemote ? removeRemoteTag : removeVacationTag
              }
            />
            <ModalFooter display={'flex'}>
              {isCurrentPageRemote ? (
                <>
                  <Button onClick={onClose} width={'6rem'}>
                    Close
                  </Button>
                  <Button
                    {...styles.buttonNext}
                    onClick={() => {
                      setIsCurrentPageRemote(false);
                    }}
                  >
                    Next
                    <FaArrowRight fontSize={12} ml={1} mt={1} />
                  </Button>{' '}
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setIsCurrentPageRemote(true);
                      setVacationDates([]);
                    }}
                    width={'6rem'}
                    leftIcon={<FaArrowLeft />}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      //handleSubmit();
                      onClose();
                    }}
                    {...styles.buttonNext}
                    width={'10rem'}
                    leftIcon={<BiUserPin />}
                  >
                    Submit Request
                  </Button>
                </>
              )}
            </ModalFooter>
          </ModalBody>
        </Scrollbars>
      </ModalContent>
    </Modal>
  );
};
