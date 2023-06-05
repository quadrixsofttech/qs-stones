import { Flex, Select } from '@chakra-ui/react';
import { useState } from 'react';
import styles from './ConferenceOverview.styles';
import ConferenceRoom from './ConferenceRoom';

const ConferenceOverview = () => {
  const [floor, setFloor] = useState('Upper floor');

  const floors = ['Upper Floor', 'Lower Floor'];

  const handleFloorChange = (e) => {
    setFloor(() => {
      return e.target.value;
    });
  };
  console.log(floor);
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
      <Flex {...styles.conferenceRooms}>
        <ConferenceRoom
          conferenceRoomNumber={'01'}
          conferenceRoomName={'Conference Room'}
          capacity={'15'}
          img={
            'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
          }
          equipment={['tv', 'macbook', 'wifi']}
        />
        <ConferenceRoom
          conferenceRoomNumber={'02'}
          conferenceRoomName={'Conference Room'}
          capacity={'8'}
          img={
            'https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80'
          }
          equipment={['tv', 'macbook', 'wifi']}
        />
        <ConferenceRoom
          conferenceRoomNumber={'03'}
          conferenceRoomName={'Brainstorm Room'}
          capacity={'5'}
          img={
            'https://images.unsplash.com/flagged/photo-1576485436509-a7d286952b65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
          }
          equipment={['tv', 'laptop', 'wifi', 'chalkboard']}
        />
      </Flex>
    </Flex>
  );
};

export default ConferenceOverview;
