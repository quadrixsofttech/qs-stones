import React from 'react';
import { DashboardNavbar } from '../../components/Navbar';
import { Box, Flex } from '@chakra-ui/react';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';

const DashboardLayout = ({ children }) => {
  return (
    <Flex flexDir="column" minH="100vh">
      <DashboardNavbar />
      <Flex>
        <DashboardSidebar />
        <Box p={4} flex={1}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
