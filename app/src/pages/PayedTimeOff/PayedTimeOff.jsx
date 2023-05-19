// import { Button, Heading, Flex, Spacer } from '@chakra-ui/react';
// import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
// import styles from './PayedTimeOff.styles.js';
// import { FaRegCalendarPlus } from 'react-icons/fa';
// import MyHistory from '../../components/MyHistory/MyHistory';

// import { MyVacationInfo } from '../../components/MyVacationInfo/MyVacationInfo';

// const PayedTimeOff = () => {
//   return (
//     <>
//       <DashboardLayout>
//         <Flex mb={4}>
//           <Heading {...styles.heading}>Paid Time Off</Heading>
//           <Spacer />
//           <Button
//             leftIcon={<FaRegCalendarPlus size={'12'} />}
//             {...styles.button}
//           >
//             Request PTO
//           </Button>
//         </Flex>
//         <Flex gap={4}>
//           <Flex flexDir={'column'}>
//             <MyVacationInfo />
//           </Flex>
//           <Flex flexDir={'column'}>
//             <MyHistory />
//           </Flex>
//         </Flex>
//       </DashboardLayout>
//     </>
//   );
// };

// export default PayedTimeOff;

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
import styles from './PayedTimeOff.styles';
import MyHistory from '../../components/MyHistory/MyHistory';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { BiUserPin } from 'react-icons/bi';
import { useState } from 'react';
import { CalendarModal } from './../../components/Modal/CalendarModal';
import { useToast } from '@chakra-ui/react';
import { MyVacationInfo } from './../../components/MyVacationInfo/MyVacationInfo';
const PayedTimeOff = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCurrentPageRemote, setIsCurrectPageRemote] = useState(true);
  const toast = useToast();
  const handleSubmit = () => {
    onClose();
    setIsCurrectPageRemote(true);
    return toast({
      title: 'Success',
      description:
        'You have submitted a request to the Admin for scheduling vacation and remote work',
      position: 'top',
      status: 'success',
      isClosable: false,
      colorScheme: 'green',
      variant: 'subtle',
    });
  };
  return (
    <>
      <DashboardLayout>
        <Flex mb={4}>
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
              {isCurrentPageRemote ? (
                <CalendarModal
                  name="Remote"
                  value={45}
                  isCurrentPageRemote={isCurrentPageRemote}
                />
              ) : (
                <CalendarModal
                  name="Vacation"
                  value={95}
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
                      setIsCurrectPageRemote(false);
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
                      setIsCurrectPageRemote(true);
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
        <Flex gap={4}>
          <Flex flexDir={'column'}>
            <MyVacationInfo />
          </Flex>
          <Flex flexDir={'column'}>
            <MyHistory />
          </Flex>
        </Flex>
      </DashboardLayout>
    </>
  );
};
export default PayedTimeOff;
