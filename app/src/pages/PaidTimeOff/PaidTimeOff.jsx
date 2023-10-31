import { Button, Heading, Flex, useDisclosure } from '@chakra-ui/react';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import styles from './PaidTimeOff.styles';
import MyHistory from '../../components/MyHistory/MyHistory';
import { MyVacationInfo } from '../../components/MyVacationInfo/MyVacationInfo';
import { RequestPTOModal } from '../../components/RequestPTOModal/RequestPTOModal';
import PTOCalendar from '../../components/PTOCalendar/PTOCalendar';
import { FaRegCalendarPlus } from 'react-icons/fa';

const PaidTimeOff = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();

  return (
    <DashboardLayout>
      <Flex mb="4" justifyContent={'space-between'}>
        <Heading {...styles.heading}>Paid Time Off</Heading>
        <Button
          leftIcon={<FaRegCalendarPlus size={'12'} />}
          {...styles.button}
          onClick={onOpen}
        >
          Request PTO
        </Button>
      </Flex>
      <RequestPTOModal isOpen={isOpen} onClose={onClose} />
      <Flex gap={4} pb={4}>
        <Flex flexDir={'column'}>
          <PTOCalendar />
          <MyVacationInfo />
        </Flex>
        <Flex flexDir={'column'} width={'100%'}>
          <MyHistory />
        </Flex>
      </Flex>
    </DashboardLayout>
  );
};
export default PaidTimeOff;
