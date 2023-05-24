import {
  Box,
  Divider,
  Flex,
  Progress,
  Select,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Info } from '@material-ui/icons';
import styles from './CalendarModal.styles';
import { useCalendar } from '../../hooks/useCalendar';
import { Calendar } from 'react-multi-date-picker';
import users from './user';
import { RenderRangeTags } from '../RenderRangeTags/RenderRangeTags';

export const CalendarModal = ({ isCurrentPageRemote, value, name }) => {
  const [
    listOfRanges,
    setListOfRanges,
    listOfRangesVacation,
    setListOfRangesVacation,
    handleClose,
  ] = useCalendar();

  const handleOnChangeRemote = (listOfRanges) => {
    setListOfRanges(listOfRanges);
  };

  const handleOnChangeVacation = (listOfRangesVacation) => {
    setListOfRangesVacation(listOfRangesVacation);
  };

  const renderListOfRanges = (listOfRanges) => {
    return listOfRanges.map((range) => (
      <RenderRangeTags
        range={range}
        key={Math.random() * 150}
        styleChange={isCurrentPageRemote ? true : false}
        handleClose={handleClose}
      />
    ));
  };

  const renderListOfRangesVacation = (listOfRangesVacation) => {
    return listOfRangesVacation
      .slice(1)
      .map((range) => (
        <RenderRangeTags
          range={range}
          key={Math.random() * 150}
          styleChange={isCurrentPageRemote ? false : true}
          handleClose={handleClose}
        />
      ));
  };

  return (
    <>
      <Flex {...styles.progress}>
        <Box>1/2</Box>
        <Progress hasStripe value={value} flex={1} colorScheme="purple" />
      </Flex>
      <Box position="relative">
        <Flex alignItems="center" mt={2} gap={2}>
          <Text {...styles.textRemote}>{name}</Text>
          <Tooltip
            label="*Double-click to select a date on the calendar. 
                  *Single-click to select a range of dates on the calendar."
            placement="right"
            hasArrow
          >
            <Info fontSize={'small'} style={{ color: '#A0AEC0' }} />
          </Tooltip>
        </Flex>
      </Box>
      <Select mt={2} mb={2}>
        {users.map((user) => {
          return (
            <option value="option" key={user.id}>
              {user.name} {user.role}
            </option>
          );
        })}
      </Select>
      {isCurrentPageRemote ? (
        <>
          <Flex alignItems="center" justifyContent="center">
            <Calendar
              range
              rangeHover
              multiple
              numberOfMonths={2}
              onChange={handleOnChangeRemote}
            />
          </Flex>
          <Text {...styles.textRequestDates}>Requested dates for Remote:</Text>
          {renderListOfRanges(listOfRanges)}
          <Divider />
        </>
      ) : (
        <>
          <Flex alignItems="center" justifyContent="center">
            <Calendar
              range
              rangeHover
              multiple
              numberOfMonths={2}
              onChange={handleOnChangeVacation}
            />
          </Flex>
          <Text {...styles.textRequestDates}>
            Requested dates for Vacation:
          </Text>
          {renderListOfRangesVacation(listOfRangesVacation)}
          <Divider />
          <Text {...styles.textRequestDates}>Requested dates for Remote:</Text>
          {renderListOfRanges(listOfRanges)}
          <Divider />
        </>
      )}
    </>
  );
};
