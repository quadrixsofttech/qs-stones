import {
  Flex,
  Select,
  StatGroup,
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
import useUser from '../../hooks/useUser';
import useAwayUsersCount from '../../hooks/useUsersWokringRemote';
import { timeOffTypes } from '../../constants/TimeOffTypes';
import RenderTabs from './RenderTabs';

const MyHistory = ({ refetchCalendarData, setRefetchCalendarData }) => {
  const [selectedOption, setSelectedOption] = useState(LeaveTypes.vacation);
  const { user } = useUser();
  const { paidTimeOffHistory, isError, isLoading, refetchPTO } = usePaidTimeOff(
    user._id
  );
  const [dates, setDates] = useState([]);
  const { awayUsers } = useAwayUsersCount();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (!isLoading) {
      const flattenedDates = paidTimeOffHistory
        .filter((select) => select.type === selectedOption.toLowerCase())
        .filter((select) => select.status === 'approved')
        .flatMap((obj) => obj.days);
      setDates(flattenedDates);
    }
    refetchPTO();
  }, [
    paidTimeOffHistory,
    selectedOption,
    isLoading,
    refetchPTO,
    refetchCalendarData,
  ]);

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
          <RenderTabs />
        </TabList>
        <TabIndicator {...styles.tabindicator} />
        <TabPanels {...styles.tabPanels}>
          <TabPanel {...styles.tabPanelPTO}>
            <Select size="sm" mb={2} onChange={handleSelectChange}>
              {Object.values(LeaveTypes).map((type) => (
                <option value={type} key={timeOffTypes.id + '-' + type}>
                  {type}
                </option>
              ))}
            </Select>
            <Calendar
              readOnly={true}
              headerOrder={headerOrder}
              className="custom-calendar-history"
              value={dates}
            />
            <StatGroup width={'100%'} height={'100%'}>
              <Flex {...styles.statgroupFlex}>
                <MyHistoryStats
                  label="The total number of employees that are not in the office today"
                  userCount={awayUsers?.numberOfVacationPTOs}
                />
                <Divider />
                <MyHistoryStats
                  label="The total number of employees working from home today"
                  userCount={awayUsers?.numberOfRemoteUsers}
                />
              </Flex>
            </StatGroup>
          </TabPanel>
          <Scrollbars style={{ height: '100%' }}>
            <TabPanel {...styles.tabPanelRequestHistory}>
              {paidTimeOffHistory.map((pto) => (
                <RequestPTO
                  key={pto._id}
                  id={pto._id}
                  status={pto.status}
                  type={pto.type}
                  time={moment(pto.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  user={{
                    firstName: pto.reviewerId?.firstName,
                    lastName: pto.reviewerId?.lastName,
                  }}
                  requestedDates={pto.dates.map(
                    ([startDate, endDate]) =>
                      `${moment(startDate * 1).format(
                        'YYYY-MM-DD'
                      )} to ${moment(endDate * 1).format('YYYY-MM-DD')}; `
                  )}
                  response={pto.comment}
                  numberOfDays={pto.days.length}
                  refetchPTO={refetchPTO}
                  setRefetchCalendarData={setRefetchCalendarData}
                  refetchCalendarData={refetchCalendarData}
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
