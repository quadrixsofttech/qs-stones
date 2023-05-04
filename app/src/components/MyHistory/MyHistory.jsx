import {
  Container,
  Flex,
  Select,
  StatGroup,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import styles from './MyHistory.styles';
import RequestPTO from '../RequestPTO/RequestPTO';
import { useState } from 'react';

const MyHistory = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container {...styles.container}>
      <Flex {...styles.flex}>
        <Text fontWeight={'bold'}>My History</Text>
      </Flex>
      <Tabs {...styles.tabs}>
        <TabList paddingLeft={4} color={'black'}>
          <Tab
            color={activeTab === 0 ? 'purple.500' : 'black'}
            onClick={() => setActiveTab(0)}
            fontWeight={500}
          >
            PTO
          </Tab>
          <Tab
            color={activeTab === 1 ? 'purple.500' : 'black'}
            onClick={() => setActiveTab(1)}
            fontWeight={500}
          >
            Request History
          </Tab>
        </TabList>
        <TabIndicator {...styles.tabindicator} />
        <TabPanels p={0}>
          <TabPanel>
            <Select size="sm" mb={2}>
              <option value="Remote">Remote</option>
              <option value="Vacation">Vacation</option>
            </Select>
            <StatGroup></StatGroup>
          </TabPanel>
          <TabPanel>
            <RequestPTO />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default MyHistory;
