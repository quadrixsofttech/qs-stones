import { Flex, Grid, GridItem, Select, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import styles from './ConferenceOverview.styles';
import ConferenceRoom from './ConferenceRoom';
import useConference from '../../hooks/useConference';

const ConferenceOverview = () => {
  const [floor, setFloor] = useState('Upper Floor');

  const { data, conferenceLoading } = useConference();

  if (conferenceLoading || !data) {
    return <Spinner />;
  }

  const floors = ['Upper Floor', 'Lower Floor'];

  const handleFloorChange = (e) => {
    setFloor(() => {
      return e.target.value;
    });
  };
  const conferenceRooms =
    floor === 'Upper Floor'
      ? data.filter((room) => room.floor === 'Upper Floor')
      : data.filter((room) => room.floor === 'Lower Floor');

  return (
    <Flex flexDir={'column'}>
      <Flex justifyContent={'flex-end'}>
        <Select
          {...styles.selectFloor}
          onChange={handleFloorChange}
          value={floor}
        >
          {floors.map((floor) => {
            return (
              <option key={floor} value={floor}>
                {floor}
              </option>
            );
          })}
        </Select>
      </Flex>
      <Grid {...styles.conferenceRoomGrid}>
        {conferenceRooms.map((room) => {
          return (
            <GridItem>
              <ConferenceRoom
                key={room.roomNumber}
                roomNumber={room.roomNumber}
                name={room.name}
                capacity={room.capacity}
                img={room.img}
                equipment={room.equipment}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default ConferenceOverview;
