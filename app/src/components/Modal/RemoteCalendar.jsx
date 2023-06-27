import { Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Calendar } from 'react-multi-date-picker';
import styles from './CalendarModal.styles';
import { RenderRangeTags } from '../RenderRangeTags/RenderRangeTags';

export default function RemoteCalendar({
  isCurrentPageRemote,
  setListOfRanges,
  listOfRanges,
  handleClose,
}) {
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
  const handleOnChangeRemote = (listOfRanges) => {
    setListOfRanges(listOfRanges);
  };
  return (
    <>
      <Flex alignItems="center" justifyContent="center">
        <Calendar
          value={listOfRanges}
          range
          rangeHover
          multiple
          numberOfMonths={2}
          onChange={(selectedDates) => handleOnChangeRemote(selectedDates)}
          className="custom-calendar"
        />
      </Flex>
      <Text {...styles.textRequestDates}>Requested dates for Remote:</Text>
      {renderListOfRanges(listOfRanges)}
      <Divider />
    </>
  );
}
