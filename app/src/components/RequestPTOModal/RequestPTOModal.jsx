import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiUserPin } from 'react-icons/bi';
import styles from '../../pages/PayedTimeOff/PayedTimeOff.styles';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { CalendarModal } from '../Modal/CalendarModal';

export const RequestPTOModal = ({ isOpen, onClose, onRequestSubmit }) => {
  const [isCurrentPageRemote, setIsCurrentPageRemote] = useState(false);

  
  const handleSubmit = () => {
    onClose();
    setIsCurrentPageRemote(true);
    onRequestSubmit(); 
  };
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent maxW="700px" maxH="600px">
        <ModalHeader {...styles.modalHeader}>Paid Time Off</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody maxH="600px" overflowY={'auto'}>
          {isCurrentPageRemote ? (
            <CalendarModal
              name="Remote"
              value={45}
              className="custom-calendar"
              isCurrentPageRemote={isCurrentPageRemote}
            />
          ) : (
            <CalendarModal
              name="Vacation"
              value={95}
              className="custom-calendar"
              isCurrentPageRemote={isCurrentPageRemote}
            />
          )}
        </ModalBody>
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
                <Box ml={2}>
                  <FaArrowRight fontSize={12} />
                </Box>
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setIsCurrentPageRemote(true);
                }}
                width={'6rem'}
                leftIcon={<FaArrowLeft />}
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  handleSubmit();
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
      </ModalContent>
    </Modal>
  );
};
