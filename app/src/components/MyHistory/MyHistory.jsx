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
  Heading,
} from '@chakra-ui/react';
import styles from './MyHistory.styles';
import RequestPTO from '../RequestPTO/RequestPTO';
import { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import './CustomCalendar.css';
import employees from './information';

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
                <Stat {...styles.stat}>
                  <StatLabel pt={2}>
                    The total number of employees working today
                  </StatLabel>
                  <StatNumber>{employees.workingToday}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    {employees.percentIncrease}% more than yesterday
                  </StatHelpText>
                </Stat>

                <Stat width={'100%'}>
                  <StatLabel pt={2}>
                    The total number of employees working remotly today or on
                    vacation
                  </StatLabel>
                  <StatNumber>{employees.awayOrRemote}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    {employees.percentDecrease}% less than yesterday
                  </StatHelpText>
                </Stat>
              </Flex>
            </StatGroup>
          </TabPanel>
          <TabPanel {...styles.tabpanel}>
            {employees.request.status.map((value)=> {
              return <RequestPTO isRequestApproved={value} />
            })}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default MyHistory;
