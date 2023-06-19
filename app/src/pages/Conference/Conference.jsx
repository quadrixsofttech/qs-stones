import styles from './Conference.styles';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import {
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import ConferenceOverview from '../../components/ConferenceOverview';
import ConferenceCalendarNavbar from '../../components/ConferenceNavbar/ConferenceCalendarNavbar';

const Conference = () => {
  return (
    <DashboardLayout Padding="0">
      <Tabs>
        <TabList>
          <Tab ml="8" {...styles.tab}>
            Calendar
          </Tab>
          <Tab {...styles.tab}>Overview</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ConferenceCalendarNavbar />
          </TabPanel>
          <Divider />
          <TabPanel>
            <ConferenceOverview />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardLayout>
  );
};

export default Conference;
