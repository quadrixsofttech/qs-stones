import React from 'react';
import { DashboardNavbar } from '../../components/Navbar';
import { Box, Flex } from '@chakra-ui/react';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';
import styles from './DashboardLayout.styles';
import { Scrollbars } from 'react-custom-scrollbars-2';

const DashboardLayout = ({ children }) => {
  return (
    <Flex height={'100vh'} overflow={'hidden'}>
      <DashboardSidebar />

      <Flex flexDir="column" flexGrow={1} >
        <DashboardNavbar />
        <Scrollbars style={{ height: '100%' }}>
        <Box {...styles.dashboardBox}>{children}</Box>
        </Scrollbars>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
