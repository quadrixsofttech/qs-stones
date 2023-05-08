import React from 'react';
import { DashboardNavbar } from '../../components/Navbar';
import { Box, Flex } from '@chakra-ui/react';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';

const DashboardLayout = ({ children }) => {
  return (
    <Flex flexDirection={'column'}>
      <DashboardNavbar />

      <Flex marginTop={'60px'}>
        <DashboardSidebar />
        <Box p={4} flex={1} marginLeft={'200px'}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
