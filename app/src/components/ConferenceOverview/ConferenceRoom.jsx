import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import styles from './ConferenceOverview.styles';
import { BiWifi, BiTv, BiLaptop, BiChalkboard } from 'react-icons/bi';
import { useTheme } from '@chakra-ui/react';
import ConferenceModal from './ConferenceModal';

const ConferenceRoom = ({
  roomNumber,
  name,
  capacity,
  img,
  equipment,
  floor,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();
  const gray400 = theme.colors.gray[400];

  return (
    <Flex {...styles.conferenceCard} onClick={onOpen}>
      <Box overflow={'hidden'} sx={{ aspectRatio: '16/6' }}>
        <Image {...styles.conferenceRoomImage} src={img} />
      </Box>
      <Flex {...styles.conferenceRoomInfo}>
        <Flex flexDir={'column'} gap="1">
          <Heading {...styles.heading}>
            <Text as="span" textDecor={'underline'} marginRight={'1'}>
              {roomNumber}
            </Text>{' '}
            {name}
          </Heading>
          <Text {...styles.capacityInfo}>
            Capacity:{' '}
            <Text as="span" fontWeight={'600'}>
              {capacity} people
            </Text>
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
      <ConferenceModal
        isOpen={isOpen}
        onClose={onClose}
        img={img}
        roomNumber={roomNumber}
        name={name}
        capacity={capacity}
        equipment={equipment}
        tag={floor}
      />
    </Flex>
  );
};

export default ConferenceRoom;
