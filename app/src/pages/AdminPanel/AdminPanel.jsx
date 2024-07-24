import DashboardLayout from '../../layout/DashboardLayout';
import {
  Flex,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import RenderTabs from './../../components/MyHistory/RenderTabs';
import { adminPanelTypes } from './../../constants/AdminPanelTypes';
import { AllUsersInfo } from './AllUsersInfo';
import { RenderAllPendingRequests } from './RenderAllPendingRequests';
import styles from './AdminPanel.styles';

const AdminPanel = () => {
  return (
    <DashboardLayout>
      <Flex gap="4" height={'100%'}>
        <Tabs w={'100%'}>
          <TabList>
            <RenderTabs objectForMapping={adminPanelTypes} />
          </TabList>
          <TabIndicator {...styles.tabIndicator} />
          <TabPanels>
            <TabPanel>
              <RenderAllPendingRequests />
            </TabPanel>
            <TabPanel>
              <AllUsersInfo />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </DashboardLayout>
  );
};

export default AdminPanel;
