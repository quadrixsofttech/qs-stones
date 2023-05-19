import { Button, Heading, Flex, Spacer } from '@chakra-ui/react';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import styles from './PayedTimeOff.styles.js';
import { FaRegCalendarPlus } from 'react-icons/fa';
import MyHistory from '../../components/MyHistory/MyHistory';

import { MyVacationInfo } from '../../components/MyVacationInfo/MyVacationInfo';

const PayedTimeOff = () => {
  return (
    <>
      <DashboardLayout>
        <Flex mb={4}>
          <Heading {...styles.heading}>Paid Time Off</Heading>
          <Spacer />
          <Button
            leftIcon={<FaRegCalendarPlus size={'12'} />}
            {...styles.button}
          >
            Request PTO
          </Button>
        </Flex>
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
