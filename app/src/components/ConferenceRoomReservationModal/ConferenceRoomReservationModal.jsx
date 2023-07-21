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
  onDelete,
  onEdit,
}) => {
  if (!data) {
    return <></>;
  }
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pl="6" pr="6">
        <ModalHeader {...styles.modalHeader}>{data.title}</ModalHeader>
        <Flex {...styles.iconBox}>
          {data.enabled && (
            <>
              <IconButton
                {...styles.icon}
                onClick={() => onEdit(data.id)}
                icon={<BiPencil size="20" />}
              />

              <IconButton
                {...styles.icon}
                onClick={() => onDelete(data.id)}
                icon={<BiTrash size="20" />}
              />
            </>
          )}
          <IconButton
            {...styles.icon}
            icon={<BiX size="20" />}
            onClick={onClose}
          />
        </Flex>

        <Divider />
        <ModalBody p="0" mt="4">
          <Flex alignItems={'center'} gap="2">
            <BiChalkboard />
            <Text color={'gray.700'}>{data.column}</Text>
            <Tag {...styles.tag}>"Upper floor"</Tag>
          </Flex>
          <Flex {...styles.infoBox}>
            <BiCalendar />
            <Text color={'gray.700'}>May 24, Wednesday</Text>
          </Flex>
          <Flex {...styles.infoBox}>
            <BiTime />
            <Text color={'gray.700'}>
              {data.start} - {data.end}
            </Text>
          </Flex>
          <Text {...styles.description}>Description:</Text>
          <Text mt="1" color={'gray.700'}>
            {data.description}
          </Text>
          <Divider mt="4" />
          <Flex {...styles.modalFooter}>
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
