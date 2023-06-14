import { Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import styles from './TimelineVertical.styles';
import TimelineCard from './';
import { TimelineSmallCard } from './';

const TimelineVertical = ({ title, data }) => {
  const hoursArray = ['08', '09', '10', '11', '12', '13', '14', '15', '16'];
  const minutesArray = ['00', '15', '30', '45'];

  const generateTimeSlots = () => {
    const timeSlots = [];

    hoursArray.forEach((hour) => {
      minutesArray.forEach((minute) => {
        timeSlots.push(`${hour}:${minute}`);
      });
    });
    timeSlots.push('17:00');
    return timeSlots;
  };
  const timeIntervals = [
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
  ];

  const timeSlots = generateTimeSlots();

  const getRowIdentifier = (timeSlot) => {
    const index = timeSlots.indexOf(timeSlot);
    return index + 1;
  }; // Preko ove funkcije dobijamo row start i row end za odredjeno vreme

  return (
    <Grid
      templateColumns={` 58px repeat(${title.length}, 1fr)`}
      {...styles.timelineGrid}
      overflow={'auto'}
    >
      <GridItem colSpan={`${title.length + 1}`} {...styles.timelineTitleBox}>
        <Grid
          templateColumns={`58px repeat(${title.length}, 1fr)`}
          {...styles.titleBox}
        >
          <GridItem colSpan={1}></GridItem>
          {title.map((headline) => {
            return (
              <GridItem pt="5" colSpan={1} key={`${headline.label}-headline`}>
                <Heading {...styles.label}>{headline.label}</Heading>
              </GridItem>
            );
          })}
        </Grid>
      </GridItem>

      <GridItem colSpan={1} rowSpan={36}>
        <Grid {...styles.timeIntervalBox}>
          <GridItem backgroundColor={'white'} rowSpan={2}>
            <Flex alignContent={'center'} justifyContent={'center'}>
              <Text {...styles.timeIntervalText}>08:00</Text>
            </Flex>
          </GridItem>
          {timeIntervals.map((timeIntervals) => {
            return (
              <GridItem
                backgroundColor={'white'}
                rowSpan={2}
                key={`${timeIntervals}`}
              >
                <Flex alignContent={'center'} justifyContent={'center'}>
                  <Text {...styles.timeIntervalText} mt="-3">
                    {timeIntervals}
                  </Text>
                </Flex>
              </GridItem>
            );
          })}
        </Grid>
      </GridItem>
      {title.map((x) => {
        return (
          <GridItem colSpan={1} rowSpan={36} key={`${x.name}-column`}>
            <Grid {...styles.timelineColumn}>
              {timeSlots.map((timeSlot) => {
                return (
                  <GridItem
                    {...styles.timelineGridBox}
                    key={`${timeSlot}timeSlot`}
                  ></GridItem>
                );
              })}

              {/* Ovde dole napravi uslovno renderovanje gde proverava dal je to ta kolona i mapiramo kroz data */}
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
  );
};
export default TimelineVertical;
