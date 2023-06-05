import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import styles from './ConferenceOverview.styles';

const ConferenceRoom = ({
  conferenceRoomNumber,
  conferenceRoomName,
  capacity,
  img,
  equipment,
}) => {
  return (
    <Flex {...styles.conferenceCard}>
      <Box overflow={'hidden'} objectFit="cover">
        <Image {...styles.conferenceRoomImage} src={img} />
      </Box>
      <Flex {...styles.conferenceRoomInfo}>
        <Flex flexDir={'column'} gap="1">
          <Heading {...styles.heading}>
            <span style={{ textDecoration: 'underline' }}>
              {conferenceRoomNumber}
            </span>{' '}
            {conferenceRoomName}
          </Heading>
          <Text {...styles.capacityInfo}>
            Capacity:{' '}
            <span style={{ fontWeight: '600' }}>{capacity} people</span>
          </Text>
        </Flex>
        <Flex gap={'1'}>
          {equipment.map((x) => {
            return <div>{x}</div>;
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ConferenceRoom;
