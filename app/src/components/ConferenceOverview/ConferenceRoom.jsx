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
        <Flex className="see-availability" {...styles.seeAvailabilityBox}>
          <Text {...styles.seeAvailabilityText}>See Availability</Text>
        </Flex>

        <Flex {...styles.iconBox} className="icon-box">
          {equipment.map((x, index) => {
            switch (x.type) {
              case 'wifi':
                return <BiWifi key={index} size={24} color={gray400} />;
              case 'tv':
                return <BiTv key={index} size={24} color={gray400} />;
              case 'chalkboard':
                return <BiChalkboard key={index} size={24} color={gray400} />;
              case 'laptop':
                return <BiLaptop key={index} size={24} color={gray400} />;
              default:
                return null;
            }
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ConferenceRoom;
