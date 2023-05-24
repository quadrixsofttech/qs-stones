import React from 'react';
import { DashboardNavbar } from '../../components/Navbar';
import { Box, Flex } from '@chakra-ui/react';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';
import styles from './DashboardLayout.styles';

const DashboardLayout = ({ children }) => {
  return (
    <Flex maxHeight={'100vh'} overflow={'hidden'}>
      <DashboardSidebar />

      <Flex flexDir="column" flexGrow={1}>
        <DashboardNavbar />
        <Box {...styles.dashboardBox}>{children}</Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
