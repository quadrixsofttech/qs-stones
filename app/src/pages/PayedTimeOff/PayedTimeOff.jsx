import { Button, Heading, Flex, Spacer } from '@chakra-ui/react';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import styles from './PayedTimeOff.styles.js';
import { FaRegCalendarPlus } from 'react-icons/fa';
import { MyVacationInfo } from '../../components/MyVacationInfo/MyVacationInfo';
import PTOCalendar from '../../components/PTOCalendar/PTOCalendar';
const PayedTimeOff = () => {
  return (
    <>
      <DashboardLayout>
        <Flex mt={2} mb={4} alignItems={'center'}>
          <Heading {...styles.heading}>Paid Time Off</Heading>
          <Spacer />
          <Button
            leftIcon={<FaRegCalendarPlus size={'12'} />}
            {...styles.button}
          >
            Request PTO
          </Button>
        </Flex>
        <Flex flexDirection={'column'}>
          <PTOCalendar />
          <MyVacationInfo />
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default PayedTimeOff;
