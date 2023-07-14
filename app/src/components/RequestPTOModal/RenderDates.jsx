import { Box, Divider, Text } from '@chakra-ui/react';
import styles from './RenderDates.styles';
import { RenderRangeTags } from './RenderRangeTags';

const RenderDates = ({
  remotePage,
  remoteDates,
  vacationDates,
  handleClose,
}) => {
  return (
    <Box>
      {remotePage ? (
        <Box>
          <Text {...styles.textRequestDates}>Requested dates for Remote:</Text>
          {remoteDates.map((x) => {
            return (
              <RenderRangeTags
                range={x}
                key={Math.random()}
                handleClose={() => handleClose(x)}
              />
            );
          })}
          <Divider marginTop="4" />
        </Box>
      ) : (
        <Box>
          <Text {...styles.textRequestDates}>
            Requested dates for Vacation:
          </Text>
          {vacationDates.map((x) => {
            return (
              <RenderRangeTags
                range={x}
                key={Math.random()}
                handleClose={() => handleClose(x)}
              />
            );
          })}

          <Divider marginTop="4" />
          <Text {...styles.textRequestDates} color={'gray.400'}>
            Requested dates for Remote:
          </Text>
          {remoteDates.map((x) => {
            return (
              <RenderRangeTags
                range={x}
                key={Math.random()}
                handleClose={handleClose}
                removable={false}
              />
            );
          })}
          <Divider marginTop="4" />
        </Box>
      )}
    </Box>
  );
};

export default RenderDates;
