import React from 'react';
import { DashboardNavbar } from '../../components/Navbar';
import { Box, Flex } from '@chakra-ui/react';

const DashboardLayout = ({ children }) => {
  return (
    <Flex bg={'gray.100'} flexDir="column" minH="100vh">
      <DashboardNavbar />
      <Box p={4} flex={1}>
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
