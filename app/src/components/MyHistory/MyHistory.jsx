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
  Divider,
  Spinner,
  Box,
} from '@chakra-ui/react';
import styles from './MyHistory.styles';
import RequestPTO from '../RequestPTO/RequestPTO';
import { useState, useEffect } from 'react';
import { Calendar } from 'react-multi-date-picker';
import { MyHistoryStats } from './MyHistoryStats';
import { LeaveTypes, headerOrder } from './constants/constants';
import Scrollbars from 'react-custom-scrollbars-2';
import { usePaidTimeOff } from '../../hooks/usePTO';
import moment from 'moment';

const MyHistory = () => {
  const [selectedOption, setSelectedOption] = useState(LeaveTypes.Vacation);
  const { paidTimeOffHistory, isError, isLoading } = usePaidTimeOff();
  const [dates, setDates] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (!isLoading) {
      const flattenedDates = paidTimeOffHistory
        .filter((select) => select.type === selectedOption)
        .flatMap((obj) => obj.days);
      setDates(flattenedDates);
    }
  }, [paidTimeOffHistory, selectedOption, isLoading]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minHeight="200px">
        <Spinner />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex>
        <Box color="red.500">An error occurred in fetching data</Box>;
      </Flex>
    );
  }

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
                readOnly={true}
                headerOrder={headerOrder}
                className="custom-calendar-history"
                value={dates}
              />
            )}
            {selectedOption === LeaveTypes.Vacation && (
              <Calendar
                readOnly={true}
                headerOrder={headerOrder}
                className="custom-calendar-history"
                value={dates}
              />
            )}
            <StatGroup width={'100%'} height={'100%'}>
              <Flex {...styles.statgroupFlex}>
                <MyHistoryStats
                  label="The total number of employees on vacation"
                  helpText="% more than yesterday"
                  working={paidTimeOffHistory.workingToday}
                  percent={paidTimeOffHistory.percentIncrease}
                  arrow={'increase'}
                />
                <Divider />
                <MyHistoryStats
                  label="The total number of employees in the company"
                  helpText="% less than yesterday"
                  working={paidTimeOffHistory.awayOrRemote}
                  percent={paidTimeOffHistory.percentDecrease}
                  arrow={'decrease'}
                />
              </Flex>
            </StatGroup>
          </TabPanel>
          <Scrollbars style={{ height: '100%' }}>
            <TabPanel {...styles.tabPanelRequestHistory}>
              {paidTimeOffHistory.map((pto) => (
                <RequestPTO
                  key={pto._id}
                  status={pto.status}
                  type={pto.type}
                  time={moment(pto.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  user={{
                    firstName: pto.reviewer.firstName,
                    lastName: pto.reviewer.lastName,
                  }}
                  requestedDates={pto.dates.map(
                    ([startDate, endDate]) =>
                      `${moment(startDate * 1).format(
                        'YYYY-MM-DD'
                      )} to ${moment(endDate * 1).format('YYYY-MM-DD')}; `
                  )}
                  response={pto.comment}
                />
              ))}
            </TabPanel>
          </Scrollbars>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default MyHistory;
