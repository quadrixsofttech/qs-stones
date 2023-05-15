import {
  Box,
  Divider,
  Flex,
  Progress,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Info } from '@material-ui/icons';
import styles from './CalendarModal.styles';
import { useCalendar } from '../../hooks/useCalendar';
import { Calendar } from 'react-multi-date-picker';
import generateRadnomIndex from '../../util/generateRandomIndex';

export const CalendarModal = (props) => {
  const [
    listOfRanges,
    setListOfRanges,
    listOfRangesVacation,
    setListOfRangesVacation,
    handleClose,
  ] = useCalendar();

  const renderRangeTag = (range, key, isVacation = false) => {
    if (range.length !== 2) {
      return null;
    }

    const startDate = range[0];
    const endDate = range[1];
    return (
      <Tag
        key={key}
        size="sm"
        fontSize="12px"
        borderRadius="full"
        variant={isVacation || props.isCurrentPageRemote ? 'subtle' : 'outline'}
        colorScheme="gray"
      >
        <TagLabel>
          {startDate.format()} - {endDate.format()}
        </TagLabel>
        <TagCloseButton onClick={() => handleClose(range, isVacation)} />
      </Tag>
    );
  };

  const handleOnChangeRemote = (listOfRanges) => {
    setListOfRanges(listOfRanges);
  };

  const handleOnChangeVacation = (listOfRangesVacation) => {
    setListOfRangesVacation(listOfRangesVacation);
  };

  const renderListOfRanges = (listOfRanges) => {
    return listOfRanges.map((range) =>
      renderRangeTag(range, generateRadnomIndex())
    );
  };

  const renderListOfRangesVacation = (listOfRangesVacation) => {
    return listOfRangesVacation
      .slice(1)
      .map((range) => renderRangeTag(range, generateRadnomIndex(), true));
  };

  return (
    <>
      <Flex {...styles.progress}>
        <Box>1/2</Box>
        <Progress hasStripe value={props.value} flex={1} colorScheme="purple" />
      </Flex>
      <Box position="relative">
        <Flex alignItems="center" mt={2} gap={2}>
          <Text {...styles.textRemote}>{props.name}</Text>
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
      <Select mt={2}>
        <option value="option1">Milos Stosic(ADMIN)</option>
        <option value="option2">Igor Stosic(ADMIN)</option>
      </Select>
      {props.isCurrentPageRemote ? (
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
          {renderListOfRanges(listOfRanges, true)}
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
          {renderListOfRangesVacation(listOfRangesVacation, false)}
          <Divider />
          <Text {...styles.textRequestDates}>Requested dates for Remote:</Text>
          {renderListOfRanges(listOfRanges, true)}
          <Divider />
        </>
      )}
    </>
  );
};
