import { Divider, Text } from '@chakra-ui/react';
import styles from './RenderDates.styles';
import { RenderRangeTags } from '../RenderRangeTags/RenderRangeTags';

const RenderDates = ({
  remotePage,
  remoteDates,
  vacationDates,
  handleClose,
}) => {
  return (
    <div>
      {remotePage ? (
        <>
          <Text {...styles.textRequestDates}>Requested dates for Remote:</Text>
          {remoteDates.map((x) => {
            console.log(x);
            return (
              <RenderRangeTags
                remotePage
                range={x}
                key={Math.random()}
                handleClose={() => handleClose(x)}
              />
            );
          })}
          <Divider />
        </>
      ) : (
        <>
          <Text {...styles.textRequestDates}>
            Requested dates for Vacation:
          </Text>
          {vacationDates.map((x) => {
            return (
              <RenderRangeTags
                remotePage
                range={x}
                key={Math.random()}
                handleClose={() => handleClose(x)}
              />
            );
          })}

          <Divider />
          <Text {...styles.textRequestDates}>Requested dates for Remote:</Text>
          {remoteDates.map((x) => {
            return (
              <RenderRangeTags
                remotePage
                range={x}
                key={Math.random()}
                handleClose={handleClose}
              />
            );
          })}
          <Divider />
        </>
      )}
    </div>
  );
};

export default RenderDates;
