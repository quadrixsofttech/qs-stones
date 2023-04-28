import { Button, Heading, Flex, Spacer } from '@chakra-ui/react';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import { FaRegCalendarPlus } from 'react-icons/fa';

const PayedTimeOff = () => {
  return (
    <>
      <DashboardLayout>
        <Flex>
          <Heading size='lg'>Paid Time Off</Heading>
          <Spacer/>
          <Button
            leftIcon={<FaRegCalendarPlus />}
            colorScheme="purple"
            variant="solid"
            size='md'
            lineHeight={28}
            fontWeight={600}
            fontFamily={'Inter'}
          >
            Request PTO
          </Button>
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default PayedTimeOff;
