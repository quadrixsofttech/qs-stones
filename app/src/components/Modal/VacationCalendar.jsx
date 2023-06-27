import { Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Calendar } from 'react-multi-date-picker';
import styles from './CalendarModal.styles';
import { RenderRangeTags } from '../RenderRangeTags/RenderRangeTags';

export default function VacationCalendar({
  isCurrentPageRemote,
  setListOfRangesVacation,
  handleClose,
  listOfRangesVacation,
  listOfRanges,
}) {
  const handleOnChangeVacation = (listOfRangesVacation) => {
    setListOfRangesVacation(listOfRangesVacation);
  };

  const renderListOfRanges = (listOfRanges) => {
    return listOfRanges.map((range, index) => (
      <RenderRangeTags
        range={range}
        key={index}
        styleChange={isCurrentPageRemote ? true : false}
        handleClose={() => handleClose(index, isCurrentPageRemote)}
      />
    ));
  };

  const renderListOfRangesVacation = (listOfRangesVacation) => {
    return listOfRangesVacation.map((range, index) => (
      <RenderRangeTags
        range={range}
        key={index}
        styleChange={isCurrentPageRemote ? false : true}
        handleClose={() => handleClose(index, isCurrentPageRemote)}
      />
    ));
  };
  return (
    <>
      <Flex alignItems="center" justifyContent="center">
        <Calendar
          value={listOfRangesVacation}
          range
          rangeHover
          multiple
          numberOfMonths={2}
          onChange={(selectedDates) => handleOnChangeVacation(selectedDates)}
          className="custom-calendar"
        />
      </Flex>
      <Text {...styles.textRequestDates}>Requested dates for Vacation:</Text>
      {renderListOfRangesVacation(listOfRangesVacation)}
      <Divider />
      <Text {...styles.textRequestDates}>Requested dates for Remote:</Text>
      {renderListOfRanges(listOfRanges)}
      <Divider />
    </>
  );
}
