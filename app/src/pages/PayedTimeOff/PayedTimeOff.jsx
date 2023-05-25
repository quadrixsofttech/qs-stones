import { Button, Heading, Flex } from '@chakra-ui/react';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import styles from './PayedTimeOff.styles.js';
import { FaRegCalendarPlus } from 'react-icons/fa';
import MyHistory from '../../components/MyHistory/MyHistory';

import { MyVacationInfo } from '../../components/MyVacationInfo/MyVacationInfo';
import PTOCalendar from '../../components/PTOCalendar/PTOCalendar';
const PayedTimeOff = () => {
  return (
    <>
      <DashboardLayout>
        <Flex mb={4} justifyContent={'space-between'}>
          <Heading {...styles.heading}>Paid Time Off</Heading>
          <Button
            leftIcon={<FaRegCalendarPlus size={'12'} />}
            {...styles.button}
          >
            Request PTO
          </Button>
        </Flex>
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
    </>
  );
};

export default PayedTimeOff;
