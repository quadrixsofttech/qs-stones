import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import styles from './TimelineVertical.styles';
import TimelineCard from './';
import CurrentTimeLine from '../CurrentTimeLine/CurrentTimeLine';
import moment from 'moment';
import { useMemo } from 'react';

const TimelineVertical = ({
  title,
  data,
  startHour,
  endHour,
  onOpen,
  onEdit,
  onDelete,
}) => {
  const timeIntervals = useMemo(() => {
    const startTime = moment(startHour, 'HH:mm');
    const endTime = moment(endHour, 'HH:mm');
    const TimeIntervals = [];

    while (startTime.isBefore(endTime)) {
      const formattedTime = startTime.format('HH:mm');
      TimeIntervals.push(formattedTime);
      startTime.add(30, 'minutes');
    }

    return TimeIntervals;
  }, [startHour, endHour]);

  const timeSlotCount = useMemo(() => {
    const startTime = moment(startHour, 'HH:mm');
    const endTime = moment(endHour, 'HH:mm');

    return endTime.diff(startTime, 'minutes') / 15;
  }, [startHour, endHour]);

  const getRowIdentifier = (timeSlot) => {
    const startTime = moment(startHour, 'HH:mm');
    const timeSlotFormatted = moment(timeSlot, 'HH:mm');
    const diffInMinutes = timeSlotFormatted.diff(startTime, 'minutes');

    const diff = diffInMinutes / 15;

    return diff + 1;
  };

  return (
    <Box overflow={'auto'}>
      <Grid
        width={title.length > 4 ? `${58 + title.length * 350}px` : '100%'}
        templateColumns={
          title.length < 5
            ? `58px repeat(${title.length}, 1fr)`
            : `58px repeat(${title.length}, 350px)`
        }
        templateRows={`repeat(${timeSlotCount}, 1fr)`}
        {...styles.timelineGrid}
        overflow={'hidden'}
      >
        <GridItem colSpan={`${title.length + 1}`} {...styles.timelineTitleBox}>
          <Grid
            templateColumns={
              title.length < 5
                ? `58px repeat(${title.length}, 1fr)`
                : `58px repeat(${title.length}, 350px)`
            }
            {...styles.titleBox}
          >
            <GridItem colSpan={1}></GridItem>
            {title.map((headline) => {
              return (
                <GridItem pt="5" colSpan={1} key={`${headline.label}-headline`}>
                  <Heading {...styles.label}>
                    <Text {...styles.underlineNumber}>{headline.number}</Text>{' '}
                    {headline.label}
                  </Heading>
                </GridItem>
              );
            })}
          </Grid>
        </GridItem>

        <GridItem colSpan={1} rowSpan={timeSlotCount}>
          <Grid
            {...styles.timeIntervalBox}
            templateRows={`repeat(${timeSlotCount}, 1fr)`}
          >
            <CurrentTimeLine
              startHour={startHour}
              endHour={endHour}
              intervals={timeSlotCount}
            />
            {timeIntervals.map((timeIntervals, index) => {
              return (
                <GridItem
                  backgroundColor={'white'}
                  rowSpan={2}
                  key={`${timeIntervals}`}
                >
                  <Flex alignContent={'center'} justifyContent={'center'}>
                    <Text
                      {...styles.timeIntervalText}
                      mt={!(index === 0) && '-3'}
                    >
                      {timeIntervals}
                    </Text>
                  </Flex>
                </GridItem>
              );
            })}
          </Grid>
        </GridItem>
        {title.map((x) => {
          const gridItems = [];
          for (let i = 0; i < timeSlotCount; i++) {
            gridItems.push(
              <GridItem
                {...styles.timelineGridBox}
                key={`${i}timeSlot`}
              ></GridItem>
            );
          }
          return (
            <GridItem
              colSpan={1}
              rowSpan={timeSlotCount}
              key={`${x.name}-column`}
            >
              <Grid
                {...styles.timelineColumn}
                templateRows={`repeat(${timeSlotCount}, 1fr)`}
              >
                {gridItems}

                {data.map((data) => {
                  if (data.column === x.name) {
                    const difference =
                      getRowIdentifier(data.end) - getRowIdentifier(data.start);
                    return (
                      <GridItem
                        {...styles.timelineCard}
                        key={`${data.id}`}
                        rowStart={getRowIdentifier(data.start)}
                        rowEnd={getRowIdentifier(data.end)}
                      >
                        <TimelineCard
                          id={data.id}
                          type={difference > 2 ? 'big' : 'small'}
                          enabled={data.enabled}
                          title={data.title}
                          start={data.start}
                          end={data.end}
                          description={data.description}
                          color={data.color}
                          user={data.user}
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
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};
export default TimelineVertical;
