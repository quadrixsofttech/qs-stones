import { Button, Heading, Flex, Spacer } from '@chakra-ui/react';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import styles from './PayedTimeOff.styles.js'
import { FaRegCalendarPlus } from 'react-icons/fa';
const PayedTimeOff = () => {
  return (
    <>
      <DashboardLayout>
        <Flex>
          <Heading {...styles.heading}>Paid Time Off</Heading>
          <Spacer/>
          <Button
          leftIcon={<FaRegCalendarPlus size={'12'}/>}
          {...styles.button}
          >
            Request PTO
          </Button>
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default PayedTimeOff;
