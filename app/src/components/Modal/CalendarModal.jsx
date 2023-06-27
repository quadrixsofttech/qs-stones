import {
  Box,
  Divider,
  Flex,
  Progress,
  Select,
  Text,
  Tooltip,
  Icon,
  Spinner,
} from '@chakra-ui/react';
import { MdInfo } from 'react-icons/md';
import styles from './CalendarModal.styles';
import { useCalendar } from '../../hooks/useCalendar';
import { Calendar } from 'react-multi-date-picker';
import { RenderRangeTags } from '../RenderRangeTags/RenderRangeTags';

export const CalendarModal = ({ isCurrentPageRemote, value, name }) => {
  const [
    listOfRanges,
    setListOfRanges,
    listOfRangesVacation,
    setListOfRangesVacation,
    handleClose,
    data,
    isLoading,
    error,
  ] = useCalendar();

  if (isLoading) {
    return (
      <Flex {...styles.flexSpinner}>
        <Spinner />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex {...styles.flexError}>
        <Text {...styles.textError}>{error.message}</Text>
      </Flex>
    );
  }

  const handleOnChangeRemote = (listOfRanges) => {
    console.log('change remote', listOfRanges);
    setListOfRanges(listOfRanges);
  };

  const handleOnChangeVacation = (listOfRangesVacation) => {
    setListOfRangesVacation(listOfRangesVacation);
  };

  const renderListOfRanges = (listOfRanges) => {
    return listOfRanges.map((range, index) => (
      <RenderRangeTags
        range={range}
        key={Math.random() * 15}
        styleChange={isCurrentPageRemote ? true : false}
        handleClose={() => handleClose(index, isCurrentPageRemote)}
      />
    ));
  };

  const renderListOfRangesVacation = (listOfRangesVacation) => {
    console.log('listOfRangesVacation', listOfRangesVacation);
    return listOfRangesVacation.map((range, index) => (
      <RenderRangeTags
        range={range}
        key={Math.random() * 150}
        styleChange={isCurrentPageRemote ? false : true}
        handleClose={() => handleClose(index, isCurrentPageRemote)}
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
            <Box>
              <Icon as={MdInfo} {...styles.icon} />
            </Box>
          </Tooltip>
        </Flex>
      </Box>
      <Select mt={2} mb={2}>
        {data.map((user) => {
          return (
            <option value="option" key={user.id}>
              {user.name}
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
              key="remoteCalendar"
              numberOfMonths={2}
              onChange={(selectedDates) => handleOnChangeRemote(selectedDates)}
              className="custom-calendar"
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
              key="vacationCalendar"
              rangeHover
              multiple
              numberOfMonths={2}
              onChange={(selectedDates) =>
                handleOnChangeVacation(selectedDates)
              }
              className="custom-calendar"
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
