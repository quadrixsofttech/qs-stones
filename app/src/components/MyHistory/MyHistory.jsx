import {
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
import employees from './information';
import { MyHistoryStats } from './MyHistoryStats';
import { LeaveTypes, headerOrder } from './constants/constants';
import Scrollbars from 'react-custom-scrollbars-2';

const MyHistory = () => {
  const [selectedOption, setSelectedOption] = useState(LeaveTypes.Remote);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Flex {...styles.container}>
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
        <TabPanels {...styles.tabPanels}>
          <TabPanel {...styles.tabPanelPTO}>
            <Select size="sm" mb={2} onChange={handleSelectChange}>
              {Object.values(LeaveTypes).map((type) => (
                <option value={type} key={LeaveTypes.id + '-' + type}>
                  {type}
                </option>
              ))}
            </Select>
            {selectedOption === LeaveTypes.Remote && (
              <Calendar
                headerOrder={headerOrder}
                className="custom-calendar-history"
              />
            )}
            {selectedOption === LeaveTypes.Vacation && (
              <Calendar
                headerOrder={headerOrder}
                className="custom-calendar-history"
              />
            )}

            <StatGroup width={'100%'} height={'100%'}>
              <Flex {...styles.statgroupFlex}>
                <MyHistoryStats
                  label="The total number of employees working today"
                  helpText="% more than yesterday"
                  working={employees.workingToday}
                  percent={employees.percentIncrease}
                  arrow={'increase'}
                />
                <MyHistoryStats
                  label="The total number of employees working remotly today or on
                  vacation"
                  helpText="% less than yesterday"
                  working={employees.awayOrRemote}
                  percent={employees.percentDecrease}
                  arrow={'decrease'}
                />
              </Flex>
            </StatGroup>
          </TabPanel>
          <TabPanel {...styles.tabPanelRequestHistory}>
            <Scrollbars style={{ height: '90%' }}>
              {Array.isArray(employees.requests) &&
                employees.requests.map((request, id) => {
                  return <RequestPTO key={id} {...request} />;
                })}
            </Scrollbars>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default MyHistory;
