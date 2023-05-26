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
import { Scrollbars } from 'react-custom-scrollbars-2';

const PayedTimeOff = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();

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
    <Scrollbars style={{ width: "100%", height: "100vh"}}>
      <DashboardLayout>
        <Flex mb={4}>
          <Heading {...styles.heading}>Paid Time Off</Heading>
          <Spacer />
          <Button {...styles.button} onClick={onOpen}>
            Request PTO
          </Button>
        </Flex>
        <RequestPTOModal
          isOpen={isOpen}
          onRequestSubmit={handleRequestSubmit}
          onClose={onClose}
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
    </Scrollbars>
  );
};
export default PayedTimeOff;
