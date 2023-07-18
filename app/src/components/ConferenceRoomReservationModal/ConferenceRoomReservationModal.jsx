import {
  Avatar,
  Divider,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tag,
  Text,
} from '@chakra-ui/react';
import styles from './ConferenceRoomReservationModal.styles';
import {
  BiCalendar,
  BiChalkboard,
  BiPencil,
  BiTime,
  BiTrash,
  BiX,
} from 'react-icons/bi';

const ConferenceRoomReservationModal = ({
  isOpen,
  onClose,
  data,
  handleDelete,
  handleEdit,
}) => {
  if (!data) {
    return <Spinner />;
  }
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pl="6" pr="6">
        <ModalHeader
          paddingTop="4"
          paddingBottom={'4'}
          pl={0}
          color={'gray.700'}
        >
          {data.title}
        </ModalHeader>
        <Flex position={'absolute'} right={4} top={2} gap="4">
          <IconButton
            backgroundColor="white"
            borderRadius={'50%'}
            onClick={() => handleEdit(data.id)}
            icon={<BiPencil size="20" />}
          />
          <IconButton
            backgroundColor="white"
            borderRadius={'50%'}
            onClick={() => handleDelete(data.id)}
            icon={<BiTrash size="20" />}
          />
          <IconButton
            icon={<BiX size="20" />}
            onClick={onClose}
            borderRadius={'50%'}
            backgroundColor="white"
          />
        </Flex>

        <Divider />
        <ModalBody p="0" mt="4">
          <Flex alignItems={'center'} gap="2">
            <BiChalkboard />
            <Text color={'gray.700'}>{data.column}</Text>
            <Tag {...styles.tag}>"Upper floor"</Tag>
          </Flex>
          <Flex alignItems={'center'} mt="4" gap="2">
            <BiCalendar />
            <Text color={'gray.700'}>May 24, Wednesday</Text>
          </Flex>
          <Flex alignItems={'center'} mt="4" gap="2">
            <BiTime />
            <Text color={'gray.700'}>
              {data.start} - {data.end}
            </Text>
          </Flex>
          <Text mt="4" color={'gray.700'} fontWeight={'semibold'}>
            Description:
          </Text>
          <Text mt="1" color={'gray.700'}>
            {data.description}
          </Text>
          <Divider mt="4" />
          <Flex pt="4" pb="4" alignItems={'center'} gap="1">
            <Avatar size="xs" src={data.user.image} />
            <Text color={'gray.700'} fontSize="xs">
              {data.user.name}
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConferenceRoomReservationModal;
