import { Box, Grid, GridItem } from '@chakra-ui/react';

const TimelineVertical = ({ title }) => {
  return (
    <Grid
      templateRows="repeat(37, 1fr)"
      templateColumns="repeat(19, 1fr)"
      backgroundColor={'gray.200'}
      gap={'2px'}
    >
      <GridItem p={2} colSpan={19} backgroundColor={'white'}>
        Titlovi
      </GridItem>

      <GridItem colSpan={1} rowSpan={36}>
        <Grid
          templateRows="repeat(36, 1fr)"
          templateColumns="repeat(1, 1fr)"
          h="100%"
          backgroundColor={'white'}
        >
          <GridItem rowSpan={4}>
            <Box>Text Text</Box>
          </GridItem>
        </Grid>
      </GridItem>

      <GridItem colSpan={6}>
        <Grid
          templateRows="repeat(36, 1fr)"
          templateColumns="repeat(1, 1fr)"
          h="100%"
          backgroundColor={'white'}
        >
          <GridItem rowSpan={4}></GridItem>
        </Grid>
      </GridItem>
      <GridItem colSpan={6}>
        <Grid
          templateRows="repeat(36, 1fr)"
          templateColumns="repeat(1, 1fr)"
          h="100%"
          backgroundColor={'white'}
        >
          <GridItem rowSpan={4}></GridItem>
        </Grid>
      </GridItem>
      <GridItem colSpan={6}>
        <Grid
          templateRows="repeat(36, 1fr)"
          templateColumns="repeat(1, 1fr)"
          gap="1px"
          h="100%"
          backgroundColor={'white'}
        >
          <GridItem rowSpan={4}></GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};
export default TimelineVertical;
