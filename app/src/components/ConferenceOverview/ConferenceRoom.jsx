import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import styles from './ConferenceOverview.styles';
import { BiWifi, BiTv, BiLaptop, BiChalkboard } from 'react-icons/bi';
import { useTheme } from '@chakra-ui/react';

const ConferenceRoom = ({
  conferenceRoomNumber,
  conferenceRoomName,
  capacity,
  img,
  equipment,
}) => {
  const theme = useTheme();
  const gray400 = theme.colors.gray[400];
  return (
    <Flex {...styles.conferenceCard}>
      <Box overflow={'hidden'}>
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
        <Flex gap={'4'}>
          {equipment.map((x) => {
            if (x === 'wifi') {
              return <BiWifi size={24} color={gray400} />;
            } else if (x === 'tv') {
              return <BiTv size={24} color={gray400} />;
            } else if (x === 'chalkboard') {
              return <BiChalkboard size={24} color={gray400} />;
            } else if (x === 'laptop') {
              return <BiLaptop size={24} color={gray400} />;
            } else {
              return null;
            }
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ConferenceRoom;
