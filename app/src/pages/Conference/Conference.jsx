import styles from './Conference.styles';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import ConferenceOverview from '../../components/ConferenceOverview';
import { useState } from 'react';

const Conference = () => {
  return (
    <DashboardLayout>
      <Tabs>
        <TabList>
          <Tab ml="8" {...styles.tab}>
            Celandar
          </Tab>
          <Tab {...styles.tab}>Overview</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <h1>Calendar Page</h1>
          </TabPanel>
          <TabPanel>
            <ConferenceOverview />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardLayout>
  );
};

export default Conference;
