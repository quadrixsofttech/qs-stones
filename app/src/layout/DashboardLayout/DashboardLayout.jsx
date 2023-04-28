import React from 'react';
import { DashboardNavbar } from '../../components/Navbar';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';
import styles from './DashboardLayout.styles';

const DashboardLayout = ({ children }) => {
  return (
    <Flex flexDirection={'column'}>
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
