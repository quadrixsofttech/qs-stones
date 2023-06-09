import {
  Button,
  CloseButton,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Tag,
  Text,
} from '@chakra-ui/react';
import styles from './ConferenceOverview.styles';
import { BiChalkboard, BiLaptop, BiTv, BiWifi } from 'react-icons/bi';
import { useTheme } from '@emotion/react';
import { NavLink } from 'react-router-dom';

const ConferenceModal = ({
  isOpen,
  onClose,
  img,
  roomNumber,
  name,
  capacity,
  equipment,
  tag,
}) => {
  const theme = useTheme();
  const gray400 = theme.colors.gray[400];
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent alignItems={'center'}>
        <Flex {...styles.modalBox}>
          <Flex {...styles.modalImageBox}>
            <Image {...styles.conferenceRoomImage} src={img} />
            <Tag {...styles.tag}>{tag}</Tag>
            <CloseButton onClick={onClose} {...styles.closeButton} />
          </Flex>
          <Flex {...styles.modalInfoContent}>
            <Flex justifyContent={'space-between'}>
              <Flex flexDir={'column'}>
                <Flex gap="8" alignItems={'center'}>
                  <Heading borderBottom={'4px'} {...styles.modalHeading}>
                    {roomNumber}
                  </Heading>
                  <Heading {...styles.modalHeading} size="2xl">
                    {name}
                  </Heading>
                </Flex>

                <Flex {...styles.capacityInfoBox}>
                  <Text fontSize={'sm'} color="gray.500">
                    Capacity:
                  </Text>
                  <Text {...styles.capacityBold}>Up to {capacity} people</Text>
                </Flex>
              </Flex>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                {equipment.map((x, index) => {
                  switch (x.type) {
                    case 'wifi':
                      return (
                        <GridItem key={index}>
                          <Flex {...styles.iconGridItem}>
                            <BiWifi size={32} color={gray400} />
                            <Text {...styles.textUnderIcon}>{x.name}</Text>
                          </Flex>
                        </GridItem>
                      );
                    case 'tv':
                      return (
                        <GridItem key={index}>
                          <Flex {...styles.iconGridItem}>
                            <BiTv size={32} color={gray400} />
                            <Text {...styles.textUnderIcon}>{x.name}</Text>
                          </Flex>
                        </GridItem>
                      );
                    case 'chalkboard':
                      return (
                        <GridItem key={index}>
                          <Flex {...styles.iconGridItem}>
                            <BiChalkboard size={32} color={gray400} />
                            <Text {...styles.textUnderIcon}>{x.name}</Text>
                          </Flex>
                        </GridItem>
                      );
                    case 'laptop':
                      return (
                        <GridItem key={index}>
                          <Flex {...styles.iconGridItem}>
                            <BiLaptop size={32} color={gray400} />
                            <Text {...styles.textUnderIcon}>{x.name}</Text>
                          </Flex>
                        </GridItem>
                      );
                    default:
                      return null;
                  }
                })}
              </Grid>
            </Flex>
          </Flex>
          <Flex justifyContent={'flex-end'} m="8">
            <Button
              {...styles.seeAvailabilityBoxButton}
              as={NavLink}
              to="/conference"
            >
              See Availability
            </Button>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default ConferenceModal;
