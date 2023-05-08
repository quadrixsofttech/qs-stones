import { MyVacationInfo } from '../../components/MyVacationInfo/MyVacationInfo';
import DashboardLayout from '../../layout/DashboardLayout';
import PTOCalendar from '../../components/PTOCalendar/PTOCalendar';
import { Flex } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Flex flexDirection={'column'}>
        <PTOCalendar />
        <MyVacationInfo />
      </Flex>
    </DashboardLayout>
  );
};

export default Dashboard;
