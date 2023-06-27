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
import { Scrollbars } from 'react-custom-scrollbars-2';

export const RequestPTOModal = ({ isOpen, onRequestSubmit, onClose }) => {
  const [isCurrentPageRemote, setIsCurrentPageRemote] = useState(true);

  const handleSubmit = () => {
    setIsCurrentPageRemote(true);
    onRequestSubmit();
  };
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  console.log(isCurrentPageRemote);

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
        </Scrollbars>
      </ModalContent>
    </Modal>
  );
};
