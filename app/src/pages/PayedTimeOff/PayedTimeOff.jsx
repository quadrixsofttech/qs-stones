import {
  Button,
  Heading,
  Flex,
  Spacer,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import styles from './PayedTimeOff.styles';
import MyHistory from '../../components/MyHistory/MyHistory';
import { MyVacationInfo } from './../../components/MyVacationInfo/MyVacationInfo';
import '../../styles/CustomCalendar.css';
import { RequestPTOModal } from '../../components/RequestPTOModal/RequestPTOModal';
import { useState } from 'react';

const PayedTimeOff = () => {
  const { onOpen, onClose } = useDisclosure();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toast = useToast();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRequestSubmit = () => {
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
        <RequestPTOModal
          isOpen={isModalOpen}
          onClose={onClose}
          onRequestSubmit={handleRequestSubmit}
        />
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
