import {
  Button,
  Heading,
  Flex,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import styles from './PayedTimeOff.styles';
import MyHistory from '../../components/MyHistory/MyHistory';

import { MyVacationInfo } from '../../components/MyVacationInfo/MyVacationInfo';
import PTOCalendar from '../../components/PTOCalendar/PTOCalendar';
import { Scrollbars } from 'react-custom-scrollbars';
import { FaRegCalendarPlus } from 'react-icons/fa';
import { RequestPTOModal } from './../../components/RequestPTOModal/RequestPTOModal';
const PayedTimeOff = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const toast = useToast();

  const handleRequestSubmit = () => {
    return toast({
      title: 'Success',
      description:
        'You have submitted a request to the Admin for scheduling vacation and remote work',
      position: 'top-right',
      status: 'success',
      isClosable: false,
      colorScheme: 'green',
      variant: 'subtle',
    });
  };

  return (
    <Scrollbars style={{ width: '100%', height: '100vh' }}>
      <DashboardLayout>
        <Flex mb={4} justifyContent={'space-between'}>
          <Heading {...styles.heading}>Paid Time Off</Heading>
          <Button
            leftIcon={<FaRegCalendarPlus size={'12'} />}
            {...styles.button}
            onClick={onOpen}
          >
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
            <PTOCalendar />
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
