import {
  Button,
  Divider,
  Icon,
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

export const RequestPTOModal = ({ isOpen, onRequestSubmit,onClose }) => {
  const [isCurrentPageRemote, setIsCurrentPageRemote] = useState(true);
   
  const handleSubmit = () => {
    onClose();
    setIsCurrentPageRemote(false);
    onRequestSubmit();
  };
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent maxW="700px" maxH="600px">
        <ModalHeader {...styles.modalHeader}>Paid Time Off</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody maxH="600px" overflowY={'auto'}>
          {isCurrentPageRemote ? (
            <>
              <CalendarModal
                name="Remote"
                value={45}
                className="custom-calendar"
                isCurrentPageRemote={isCurrentPageRemote}
              />
              <ModalFooter display={'flex'}>
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
                  <Icon as={FaArrowRight} fontSize={12} ml={1} mt={1} />
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <CalendarModal
                name="Vacation"
                value={95}
                className="custom-calendar"
                isCurrentPageRemote={isCurrentPageRemote}
              />
              <ModalFooter display={'flex'}>
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
              </ModalFooter>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
