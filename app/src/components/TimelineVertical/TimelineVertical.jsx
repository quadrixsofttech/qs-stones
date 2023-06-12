import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';

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

  const timeSlots = generateTimeSlots();

  const getRowIdentifier = (timeSlot) => {
    const index = timeSlots.indexOf(timeSlot);
    return (index + 1) * 2;
  }; // Preko ove funkcije dobijamo row start i row end za odredjeno vreme

  return (
    <Grid
      templateRows="repeat(74, 1fr)"
      templateColumns="repeat(19, 1fr)"
      backgroundColor={'gray.200'}
      gap={'1px'}
    >
      <GridItem p={2} colSpan={19} rowSpan={1} backgroundColor={'white'}>
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(19, 1fr)"
          h="100%"
          backgroundColor={'white'}
          textAlign={'center'}
        >
          <GridItem colSpan={1}></GridItem>
          {title.map((headline) => {
            return (
              <GridItem key={`headline-${headline.name}`} colSpan={6}>
                {headline.label}
              </GridItem>
            );
          })}
        </Grid>
      </GridItem>

      <GridItem colSpan={1} rowSpan={74} backgroundColor={'white'}>
        <Grid
          templateRows="repeat(74, 1fr)"
          templateColumns="repeat(1, 1fr)"
          h="100%"
          gap={'1px'}
          backgroundColor={'gray.200'}
        >
          <GridItem backgroundColor={'white'} rowSpan={4}>
            <Flex
              alignContent={'center'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text fontSize={'sm'}>08:00</Text>
            </Flex>
          </GridItem>
          <GridItem backgroundColor={'white'} rowSpan={4}>
            <Flex
              alignContent={'center'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text fontSize={'sm'}>08:30</Text>
            </Flex>
          </GridItem>
        </Grid>
      </GridItem>
      {title.map((x) => {
        return (
          <GridItem key={x.name} colSpan={6} rowSpan={74}>
            <Grid
              templateRows="repeat(74, 1fr)"
              templateColumns="repeat(1, 1fr)"
              gap={'1px'}
              height="100%"
              position={'relative'}
            >
              {timeSlots.map((timeSlot) => {
                return (
                  <GridItem
                    key={`${title.name}${x}`}
                    backgroundColor={'white'}
                    rowSpan={2}
                  >
                    {timeSlot}
                  </GridItem>
                );
              })}

              {/* Ovde dole napravi uslovno renderovanje gde proverava dal je to ta kolona i mapiramo kroz data */}
              {data.map((data) => {
                if (data.column === x.name) {
                  return (
                    <GridItem
                      mt={-8}
                      ml={4}
                      height={'98%'}
                      width={'90%'}
                      rowStart={getRowIdentifier(data.start)}
                      rowEnd={getRowIdentifier(data.end)}
                      position={'absolute'}
                      backgroundColor={'black'}
                    ></GridItem>
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
