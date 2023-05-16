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
  Heading,
} from '@chakra-ui/react';
import styles from './MyHistory.styles';
import RequestPTO from '../RequestPTO/RequestPTO';
import { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import './CustomCalendar.css';
import employees from './information';
import { StatComponentMyHistory } from './../StatComponentMyHistory/StatComponentMyHistory';

const MyHistory = () => {
  const [selectedOption, setSelectedOption] = useState('Remote');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Container {...styles.container}>
      <Flex {...styles.header}>
        <Heading as="h2" size="sm">
          My History
        </Heading>
      </Flex>
      <Tabs {...styles.tabs}>
        <TabList paddingLeft={4} color={'black'}>
          <Tab _selected={{ color: 'purple.500' }} fontWeight={500}>
            PTO
          </Tab>
          <Tab _selected={{ color: 'purple.500' }} fontWeight={500}>
            Request History
          </Tab>
        </TabList>
        <TabIndicator {...styles.tabindicator} />
        <TabPanels p={0}>
          <TabPanel>
            <Select size="sm" mb={2} onChange={handleSelectChange}>
              <option value="Remote">Remote</option>
              <option value="Vacation">Vacation</option>
            </Select>
            {selectedOption === 'Remote' && (
              <Calendar
                headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
                className="custom-calendar"
              />
            )}
            {selectedOption === 'Vacation' && (
              <Calendar
                headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
                className="custom-calendar"
              />
            )}

            <StatGroup>
              <Flex {...styles.statgroup_flex}>
                <StatComponentMyHistory
                  label="The total number of employees working today"
                  help_text="% more than yesterday"
                  working={employees.workingToday}
                  percent={employees.percentIncrease}
                  arrow={"increase"}
                />
                <StatComponentMyHistory
                  label="The total number of employees working remotly today or on
                  vacation"
                  help_text="% less than yesterday"
                  working={employees.awayOrRemote}
                  percentIncrease={employees.percentDecrease}
                  arrow={"decrease"}
                />
              </Flex>
            </StatGroup>
          </TabPanel>
          <TabPanel {...styles.tabpanel}>
            {Array.isArray(employees.requests) &&
              employees.requests.map((request, id) => {
                return (
                  <RequestPTO
                    key={id}
                    requestStatus={request.status}
                    request={request}
                  />
                );
              })}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default MyHistory;
