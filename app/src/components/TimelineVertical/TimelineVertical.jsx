import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import styles from './TimelineVertical.styles';
import TimelineCard from './';
import { TimelineSmallCard } from './';
import CurrentTimeLine from '../CurrentTimeLine/CurrentTimeLine';
import moment from 'moment';

const TimelineVertical = ({ title, data }) => {
  const generateTimeSlots = (start, end) => {
    const startTime = moment(start, 'HH:mm');
    const endTime = moment(end, 'HH:mm');

    const timeSlots = [];

    while (startTime.isSameOrBefore(endTime)) {
      timeSlots.push(startTime.format('HH:mm'));
      startTime.add(15, 'minutes');
    }

    timeSlots.pop();
    return timeSlots;
  };

  const generateTimeIntervals = (start, end) => {
    const startTime = moment(start, 'HH:mm');
    const endTime = moment(end, 'HH:mm');
    const timeIntervals = [];

    while (startTime.isSameOrBefore(endTime)) {
      const formattedTime = startTime.format('HH:mm');
      timeIntervals.push(formattedTime);
      startTime.add(30, 'minutes');
    }
    timeIntervals.pop();

    return timeIntervals;
  };

  const timeIntervals = generateTimeIntervals('08:00', '17:00');

  const timeSlots = generateTimeSlots('08:00', '17:00');

  console.log(timeIntervals, timeSlots);

  const getRowIdentifier = (timeSlot) => {
    const startTime = moment('08:00', 'HH:mm');
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
                    <Text
                      as="span"
                      borderBottom={'2px'}
                      borderColor={'gray.700'}
                    >
                      {headline.number}
                    </Text>{' '}
                    {headline.label}
                  </Heading>
                </GridItem>
              );
            })}
          </Grid>
        </GridItem>

        <GridItem colSpan={1} rowSpan={36}>
          <Grid {...styles.timeIntervalBox}>
            <CurrentTimeLine />
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
          for (let i = 0; i < 36; i++) {
            gridItems.push(
              <GridItem
                {...styles.timelineGridBox}
                key={`${i}timeSlot`}
              ></GridItem>
            );
          }
          return (
            <GridItem colSpan={1} rowSpan={36} key={`${x.name}-column`}>
              <Grid {...styles.timelineColumn}>
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
                        {difference > 2 ? (
                          <TimelineCard
                            id={data.id}
                            //type={difference > 2 ? 'big' : 'small'}
                            enabled={data.enabled}
                            title={data.title}
                            start={data.start}
                            end={data.end}
                            description={data.description}
                            color={data.color}
                            user={data.user}
                          />
                        ) : (
                          <TimelineSmallCard
                            id={data.id}
                            enabled={data.enabled}
                            title={data.title}
                            start={data.start}
                            end={data.end}
                            description={data.description}
                            color={data.color}
                            user={data.user}
                          />
                        )}
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
