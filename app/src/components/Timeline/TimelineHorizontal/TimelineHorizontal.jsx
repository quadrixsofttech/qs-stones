import { useMemo } from 'react';
import styles from './TimelineHorizontal.styles';
import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import moment from 'moment';
import TimelineCard from '../TimelineCard/TimelineCard';
import CurrentTimeLine from '../../CurrentTimeLine/CurrentTimeLine';

const TimelineHorizontal = ({
  title,
  data,
  startHour,
  endHour,
  onOpen,
  onEdit,
  onDelete,
  user,
}) => {
  const timeSlots = useMemo(() => {
    const startTime = moment(startHour, 'HH:mm');
    const endTime = moment(endHour, 'HH:mm');

    const TimeSlots = [];

    while (startTime.isSameOrBefore(endTime)) {
      TimeSlots.push(startTime.format('HH:mm'));
      startTime.add(15, 'minutes');
    }

    TimeSlots.pop();
    return TimeSlots;
  }, [startHour, endHour]);

  const getColumnIdentifier = (timeSlot) => {
    const startTime = moment(startHour, 'HH:mm');
    const timeSlotFormatted = moment(timeSlot, 'HH:mm');
    const diffInMinutes = timeSlotFormatted.diff(startTime, 'minutes');

    return diffInMinutes / 15 + 2;
  };
  return (
    <Box {...styles.TimelineHorizontal}>
      <CurrentTimeLine
        startHour={startHour}
        endHour={endHour}
        intervals={timeSlots.length}
        orientation="vertical"
      />
      <Grid gap="1px">
        <Grid
          templateColumns={`250px repeat(${timeSlots.length},176px)`}
          gap="1px"
        >
          <GridItem height={'44px'} backgroundColor={'white'}>
            <Flex p="3.5" pl="2">
              <Heading {...styles.conferenceHeader}>Conference Rooms</Heading>
            </Flex>
          </GridItem>
          {timeSlots.map((timeSlot) => {
            return (
              <GridItem key={`key-${timeSlot}`} {...styles.timeSlotBox}>
                <Flex p="2.5" pl="2">
                  <Text {...styles.timeSlot}>{timeSlot}</Text>
                </Flex>
              </GridItem>
            );
          })}
        </Grid>
        {title.map((title, index) => {
          return (
            <Grid
              templateColumns={`250px repeat(${timeSlots.length},176px)`}
              gap="1px"
              position="relative"
              key={`key-${title} index-${index}`}
            >
              <GridItem height={'52px'} backgroundColor={'white'}>
                <Flex p="4" pl="2">
                  <Heading {...styles.headingConference}>
                    <Heading {...styles.underlineHeading} as="span">
                      {title.id}
                    </Heading>
                    {title.name}
                  </Heading>
                </Flex>
              </GridItem>

              {timeSlots.map((timeSlot) => {
                return (
                  <GridItem
                    {...styles.gridBox}
                    key={`key-${timeSlot}-box`}
                  ></GridItem>
                );
              })}
              {data.map((data, index) => {
                if (data.conferenceRoom.name === title.name) {
                  return (
                    <GridItem
                      {...styles.horizontalCard}
                      gridColumnStart={getColumnIdentifier(data.startTime)}
                      gridColumnEnd={getColumnIdentifier(data.endTime)}
                      key={`key-${data.startTime}- ${index}index`}
                    >
                      <TimelineCard
                        id={data._id}
                        type={'small'}
                        title={data.conferenceRoom.name}
                        start={data.startTime}
                        end={data.endTime}
                        description={data.description}
                        color={data.color}
                        user={data.user}
                        enabled={data.userId === user._id}
                        orientation="horizontal"
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onOpen={onOpen}
                      />
                    </GridItem>
                  );
                } else {
                  return null;
                }
              })}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
export default TimelineHorizontal;
