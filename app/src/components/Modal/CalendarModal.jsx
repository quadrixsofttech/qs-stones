import {
  Box,
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
import VacationCalendar from './VacationCalendar';
import RemoteCalendar from './RemoteCalendar';

export const CalendarModal = ({ isCurrentPageRemote, value, name }) => {
  const [
    listOfRanges,
    setListOfRanges,
    listOfRangesVacation,
    setListOfRangesVacation,
    handleClose,
    isLoading,
    error,
    data,
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
          <RemoteCalendar
            listOfRanges={listOfRanges}
            setListOfRanges={setListOfRanges}
            handleClose={handleClose}
            isCurrentPageRemote={isCurrentPageRemote}
          />
        </>
      ) : (
        <>
          <VacationCalendar
            listOfRanges={listOfRanges}
            listOfRangesVacation={listOfRangesVacation}
            setListOfRangesVacation={setListOfRangesVacation}
            handleClose={handleClose}
            isCurrentPageRemote={isCurrentPageRemote}
          />
        </>
      )}
    </>
  );
};
