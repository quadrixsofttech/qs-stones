import React from 'react';
import { DashboardNavbar } from '../../components/Navbar';
import { Grid, GridItem } from '@chakra-ui/react';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';
import styles from './DashboardLayout.styles';

const DashboardLayout = ({ children }) => {
  return (
    <Grid {...styles.gridTemplate}>
      <GridItem area={'header'}>
        <DashboardNavbar />
      </GridItem>
      <GridItem bg="pink.300" area={'nav'}>
        <DashboardSidebar />
      </GridItem>
      <GridItem bg="green.300" area={'main'}>
        {children}
      </GridItem>
    </Grid>
  );
};

export default DashboardLayout;
