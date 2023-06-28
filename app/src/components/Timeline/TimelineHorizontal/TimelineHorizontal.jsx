import { useMemo } from 'react';
import styles from './TimelineHorizontal.styles';
import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import moment from 'moment';
import TimelineCard from '../TimelineCard/TimelineCard';
import { Scrollbars } from 'react-custom-scrollbars-2';

const TimelineHorizontal = ({ title, data }) => {
  var startHour = '08:00';
  var endHour = '17:00';

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

    const diff = diffInMinutes / 15;

    return diff + 2;
  };
  return (
    <Box
      overflow={'auto'}
      backgroundColor="gray.200"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Grid gap="1px">
        <Grid
          templateColumns={`250px repeat(${timeSlots.length},176px)`}
          gap="1px"
        >
          <GridItem height={'44px'} backgroundColor={'white'}>
            <Flex p="3.5" pl="2">
              <Heading color="gray.700" fontSize={'xs'} fontWeight={'normal'}>
                Conference Rooms
              </Heading>
            </Flex>
          </GridItem>
          {timeSlots.map((timeSlot) => {
            return (
              <GridItem
                key={`key-${timeSlot}`}
                height="44px"
                width="176px"
                backgroundColor={'white'}
              >
                <Flex p="2.5" pl="2">
                  <Text color="gray.700" fontSize={'xs'} fontWeight={'normal'}>
                    {timeSlot}
                  </Text>
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
                  <Heading
                    color="gray.700"
                    fontSize="sm"
                    fontWeight={'semibold'}
                  >
                    <Heading
                      as="span"
                      borderBottom={'1px'}
                      borderColor={'gray.700'}
                      fontSize={'sm'}
                      fontWeight={'semibold'}
                      mr="1"
                    >
                      {title.number}
                    </Heading>
                    {title.label}
                  </Heading>
                </Flex>
              </GridItem>

              {timeSlots.map((timeSlot) => {
                return (
                  <GridItem
                    height={'52px'}
                    width="176px"
                    backgroundColor={'gray.50'}
                    key={`key-${timeSlot}-box`}
                  ></GridItem>
                );
              })}
              {data.map((data, index) => {
                if (data.column === title.name) {
                  return (
                    <GridItem
                      position="absolute"
                      gridColumnStart={getColumnIdentifier(data.start)}
                      gridColumnEnd={getColumnIdentifier(data.end)}
                      width={'100%'}
                      height={'52px'}
                      key={`key-${data.start}- ${index}index`}
                    >
                      <TimelineCard
                        id={data.id}
                        type={'small'}
                        enabled={data.enabled}
                        title={data.title}
                        start={data.start}
                        end={data.end}
                        description={data.description}
                        color={data.color}
                        user={data.user}
                        orientation="horizontal"
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
