import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import styles from './ConferenceOverview.styles';
import { BiChalkboard, BiLaptop, BiTv, BiWifi } from 'react-icons/bi';
import { useTheme } from '@emotion/react';

const ConferenceModal = ({
  isOpen,
  onClose,
  img,
  roomNumber,
  name,
  capacity,
  equipment,
}) => {
  const theme = useTheme();
  const gray400 = theme.colors.gray[400];
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent alignItems={'center'}>
        <Flex
          backgroundColor={'white'}
          flexDir={'column'}
          width={'68vw'}
          borderRadius={'6px'}
          overflow={'hidden'}
        >
          <Box overflow="hidden" sx={{ aspectRatio: '16/6' }}>
            <Image {...styles.conferenceRoomImage} src={img} />
          </Box>
          <Flex flexDir={'column'} p="8" gap="8">
            <Flex justifyContent={'space-between'}>
              <Flex flexDir={'column'} pb="14">
                <Heading>
                  <span style={{ textDecoration: 'underline' }}>
                    {roomNumber}
                  </span>{' '}
                  {name}
                </Heading>
                <Text mt="5" ml={'16'}>
                  Capacity:{' '}
                  <span style={{ fontWeight: '600' }}>{capacity} people</span>
                </Text>
              </Flex>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                {equipment.map((x, index) => {
                  switch (x.type) {
                    case 'wifi':
                      return (
                        <GridItem key={index}>
                          <Flex
                            flexDir={'column'}
                            alignItems={'center'}
                            width={'24'}
                          >
                            <BiWifi key={index} size={24} color={gray400} />
                            <Text
                              color={gray400}
                              fontSize={'sm'}
                              textAlign={'center'}
                            >
                              {x.name}
                              Super Fast Wifi
                            </Text>
                          </Flex>
                        </GridItem>
                      );
                    case 'tv':
                      return (
                        <GridItem key={index}>
                          <Flex
                            flexDir={'column'}
                            alignItems={'center'}
                            width={'24'}
                          >
                            <BiTv key={index} size={24} color={gray400} />
                            <Text
                              color={gray400}
                              fontSize={'sm'}
                              textAlign={'center'}
                            >
                              {x.name} 50 Incha bato
                            </Text>
                          </Flex>
                        </GridItem>
                      );
                    case 'chalkboard':
                      return (
                        <GridItem key={index}>
                          <Flex
                            flexDir={'column'}
                            alignItems={'center'}
                            width={'24'}
                          >
                            <BiChalkboard
                              key={index}
                              size={24}
                              color={gray400}
                            />
                            <Text
                              color={gray400}
                              fontSize={'sm'}
                              textAlign={'center'}
                            >
                              {x.name}
                              Bela Tabla
                            </Text>
                          </Flex>
                        </GridItem>
                      );
                    case 'laptop':
                      return (
                        <GridItem key={index}>
                          <Flex
                            flexDir={'column'}
                            alignItems={'center'}
                            width={'24'}
                          >
                            <BiLaptop key={index} size={24} color={gray400} />
                            <Text
                              color={gray400}
                              fontSize={'sm'}
                              textAlign={'center'}
                            >
                              {x.name}
                              Mac 13"
                            </Text>
                          </Flex>
                        </GridItem>
                      );
                    default:
                      return null;
                  }
                })}
              </Grid>
            </Flex>
            <Flex justifyContent={'flex-end'}>
              <Button>See Availability</Button>
            </Flex>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default ConferenceModal;
