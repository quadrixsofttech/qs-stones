import {
  Button,
  Heading,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Box,
  Divider,
} from '@chakra-ui/react';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import styles from './PTO.styles.js';
import MyHistory from '../../components/MyHistory/MyHistory';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { BiUserPin } from 'react-icons/bi';
import { useState } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import { CalendarModal } from './../../components/Modal/CalendarModal';

const PayedTimeOff = () => {
  const { handleSubmit } = useCalendar();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <DashboardLayout>
        <Flex>
          <Heading {...styles.heading}>Paid Time Off</Heading>
          <Spacer />
          <Button {...styles.button} onClick={onOpen}>
            Request PTO
          </Button>
        </Flex>
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
              {!isClicked ? (
                <CalendarModal name="Remote" value={45} isClicked={isClicked} />
              ) : (
                <CalendarModal name="Vacation" value={95} />
              )}
            </ModalBody>
            <ModalFooter display={'flex'}>
              {!isClicked ? (
                <>
                  <Button onClick={onClose} width={'6rem'}>
                    Close
                  </Button>
                  <Button
                    {...styles.buttonNext}
                    onClick={() => setIsClicked(!isClicked)}
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
                    onClick={() => setIsClicked(!isClicked)}
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
        <MyHistory />
      </DashboardLayout>
    </>
  );
};

export default PayedTimeOff;
