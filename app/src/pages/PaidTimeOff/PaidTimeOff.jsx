import { Button, Heading, Flex, useDisclosure, Spacer } from '@chakra-ui/react';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import styles from './PaidTimeOff.styles';
import MyHistory from '../../components/MyHistory/MyHistory';
import { MyVacationInfo } from '../../components/MyVacationInfo/MyVacationInfo';
import { RequestPTOModal } from '../../components/RequestPTOModal/RequestPTOModal';
import PTOCalendar from '../../components/PTOCalendar/PTOCalendar';
import { RemoteModal } from '../../components/RemoteModal/RemoteModal';
import useEmployees from '../../hooks/useEmployees';
import { useState } from 'react';

const PaidTimeOff = () => {
  const {
    onClose: onCloseRemote,
    isOpen: isOpenRemote,
    onOpen: onOpenRemote,
  } = useDisclosure();

  const {
    onClose: onCloseTimeOff,
    isOpen: isOpenTimeOff,
    onOpen: onOpenTImeOff,
  } = useDisclosure();

  const [refetchCalendarData, setRefetchCalendarData] = useState(false);

  return (
    <DashboardLayout>
      <Flex mb="4">
        <Heading {...styles.heading}>Time Off</Heading>
        <Spacer />
        <Button {...styles.button} onClick={onOpenTImeOff}>
          Request Time off
        </Button>
        <Button {...styles.button} variant={'outline'} onClick={onOpenRemote}>
          Remote
        </Button>
      </Flex>
      <RemoteModal isOpen={isOpenRemote} onClose={onCloseRemote} setRefetchCalendarData={setRefetchCalendarData} />
      <RequestPTOModal isOpen={isOpenTimeOff} onClose={onCloseTimeOff} />
      <Flex gap={4} pb={4}>
        <Flex flexDir={'column'}>
          <PTOCalendar refetchCalendarData={refetchCalendarData} />
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
