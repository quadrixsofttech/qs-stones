import { Button, Heading, Flex, Spacer } from '@chakra-ui/react';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import styles from './PTO.styles.js';
import MyHistory from '../../components/MyHistory/MyHistory';

const PayedTimeOff = () => {
  return (
    <>
      <DashboardLayout>
        <Flex>
          <Heading {...styles.heading}>Paid Time Off</Heading>
          <Spacer />
          <Button {...styles.button}>Request PTO</Button>
        </Flex>
        <MyHistory />
      </DashboardLayout>
    </>
  );
};

export default PayedTimeOff;
