import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import styles from './ConferenceOverview.styles';
import {
  BiWifi,
  BiTv,
  BiLaptop,
  BiChalkboard,
  BiArrowBack,
} from 'react-icons/bi';
import { useTheme } from '@chakra-ui/react';
import { useState } from 'react';

const ConferenceRoom = ({
  conferenceRoomNumber,
  conferenceRoomName,
  capacity,
  img,
  equipment,
}) => {
  const [bigCard, setBigCard] = useState(false);
  const theme = useTheme();
  const gray400 = theme.colors.gray[400];
  const onClick = () => {
    setBigCard(!bigCard);
  };
  return bigCard ? (
    <Flex {...styles.conferenceBigCard} {...styles.bigCard}>
      <Box overflow={'hidden'}>
        <Image objectFit={'cover'} height={'60%'} width={'100%'} src={img} />
      </Box>
      <BiArrowBack size={55} onClick={onClick} />
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
                return (
                  <Flex>
                    <BiWifi key={index} size={24} color={gray400} />
                    <Text color={'black'}>{x.name}</Text>
                  </Flex>
                );
              case 'tv':
                return (
                  <Flex>
                    <BiTv key={index} size={24} color={gray400} />
                    <Text>{x.name}</Text>
                  </Flex>
                );
              case 'chalkboard':
                return (
                  <Flex>
                    <BiChalkboard key={index} size={24} color={gray400} />
                    <Text>{x.name}</Text>
                  </Flex>
                );
              case 'laptop':
                return (
                  <Flex>
                    <BiLaptop key={index} size={24} color={gray400} />
                    <Text>{x.name}</Text>
                  </Flex>
                );
              default:
                return null;
            }
          })}
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Flex onClick={onClick} {...styles.conferenceCard}>
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
