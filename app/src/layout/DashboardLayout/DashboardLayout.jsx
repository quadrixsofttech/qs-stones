import React from 'react';
import { DashboardNavbar } from '../../components/Navbar';
import { Box, Flex } from '@chakra-ui/react';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';

const DashboardLayout = ({ children }) => {
  return (
    <Flex maxHeight={'100vh'} overflow={'hidden'}>
      <DashboardSidebar />

      <Flex flexDir="column" flexGrow={1}>
        <DashboardNavbar />
        <Box p={4} flex={1} maxHeight={'100vh'} overflow={'auto'}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
