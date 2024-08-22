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
import moment from 'moment';

const ConferenceRoomReservationModal = ({
  isOpen,
  onClose,
  data,
  onDelete,
  onEdit,
  user,
}) => {
  if (!data) {
    return <></>;
  }

  const enabled = data.userId === user._id;

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pl="6" pr="6">
        <ModalHeader {...styles.modalHeader}>{data.title}</ModalHeader>
        <Flex {...styles.iconBox}>
          {enabled && (
            <>
              <IconButton
                {...styles.icon}
                onClick={() => onEdit(data._id)}
                icon={<BiPencil size="20" />}
              />

              <IconButton
                {...styles.icon}
                onClick={() => onDelete(data._id)}
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
            <Text color={'gray.700'}>
              {data.id + ' ' + data.conferenceRoomName}
            </Text>
            <Tag {...styles.tag}>{data.floor}</Tag>
          </Flex>
          <Flex {...styles.infoBox}>
            <BiCalendar />
            <Text color={'gray.700'}>
              {moment(data.date).format('MMMM DD, dddd')}
            </Text>
          </Flex>
          <Flex {...styles.infoBox}>
            <BiTime />
            <Text color={'gray.700'}>
              {data.startTime} - {data.endTime}
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
              {data.user.firstName + ' ' + data.user.lastName}
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConferenceRoomReservationModal;
