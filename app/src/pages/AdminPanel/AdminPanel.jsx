import React from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import ListOfEmployees from '../../components/ListOfEmployees/ListOfEmployees';
import { Flex } from '@chakra-ui/react';
import EmployeeComponent from '../../components/EmployeeComponent';

const AdminPanel = () => {
  return (
    <DashboardLayout>
      <Flex gap={'4'} height={'100%'}>
        <ListOfEmployees />
        <EmployeeComponent />
      </Flex>
    </DashboardLayout>
  );
};

export default AdminPanel;
