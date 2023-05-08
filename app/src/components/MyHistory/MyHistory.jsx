import {
  Container,
  Flex,
  Select,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
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
import { Calendar, DateObject } from 'react-multi-date-picker';
import './CustomCalendar.css';

const MyHistory = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [values, setValues] = useState([new DateObject()]);

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
          <TabPanel >
            <Select size="sm" mb={2}>
              <option value="Remote">Remote</option>
              <option value="Vacation">Vacation</option>
            </Select>
            <Calendar
              headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
              className="custom-calendar"
              value={values}
              values={setValues}
            />
            <StatGroup> 
              <Flex {...styles.statgroup_flex}>
                <Stat width={'100%'}>
                  <StatLabel pt={2}>
                    The total number of employees working today
                  </StatLabel>
                  <StatNumber>16</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    10% more than yesterday
                  </StatHelpText>
                </Stat>

                <Stat width={'100%'}>
                  <StatLabel pt={2}>
                    The total number of employees working remotly today or on
                    vacation
                  </StatLabel>
                  <StatNumber>8</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    5% less than yesterday
                  </StatHelpText>
                </Stat>
              </Flex>
            </StatGroup>
          </TabPanel>
          <TabPanel {...styles.tabpanel}>
            <RequestPTO isRequestApproved={0} />
            <RequestPTO isRequestApproved={1} />
            <RequestPTO isRequestApproved={2} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default MyHistory;
