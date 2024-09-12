import { Flex, Grid, GridItem, Select, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import styles from './ConferenceOverview.styles';
import ConferenceRoom from './ConferenceRoom';
import useConference from '../../hooks/useConference';

const ConferenceOverview = () => {
  const [floor, setFloor] = useState('Upper Floor');

  const { conferenceRooms, conferenceLoading } = useConference();

  if (conferenceLoading || !conferenceRooms) {
    return <Spinner />;
  }

  const floors = ['Upper Floor'];

  const handleFloorChange = (e) => {
    setFloor(() => {
      return e.target.value;
    });
  };

  const conferenceRoomsFiltered =
    floor === 'Upper Floor'
      ? conferenceRooms.filter((room) => room.floor === 'Upper Floor')
      : conferenceRooms.filter((room) => room.floor === 'Lower Floor');

  return (
    <Flex flexDir={'column'} position={'relative'}>
      <Flex justifyContent={'flex-end'} mt="4">
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
        {conferenceRoomsFiltered.map((room) => {
          return (
            <GridItem key={room.id}>
              <ConferenceRoom
                key={room.id}
                id={room.id}
                name={room.name}
                capacity={room.capacity}
                img={room.img}
                equipment={room.equipment}
                floor={room.floor}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default ConferenceOverview;
