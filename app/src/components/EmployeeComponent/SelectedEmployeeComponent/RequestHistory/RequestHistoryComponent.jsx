import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import styles from './RequestHistory.styles';
import RequestStatusWrapper from '../../../RequestPTO/RequestStatus/RequestStatus';
import { BiCommentDetail } from 'react-icons/bi';
import moment from 'moment';
import {
  capitalizeFirstLetter,
  showDateRangesAsString,
} from '../../../../util/index';
import { RenderRangeTags } from '../../../RequestPTOModal/RenderRangeTags';
import RequestHistoryModal from '../RequestHistoryModal/RequestHistoryModal';

const RequestHistoryComponent = ({
  createdAt,
  dates,
  comment,
  status,
  type,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        {...styles.requestHistoryBox}
        onClick={onOpen}
        borderColor={isOpen ? 'purple.400' : 'gray.200'}
      >
        <Flex height={'100%'} alignItems="center">
          <Text {...styles.createdAt}>
            {moment(createdAt).format('YYYY-MM-DD hh:mm')}
          </Text>
          <Divider {...styles.divider} />
          <Text {...styles.dates}>{showDateRangesAsString(dates)} </Text>
        </Flex>
        <Flex {...styles.statusBox}>
          {comment && <BiCommentDetail size="20" />}

          <RequestStatusWrapper status={status} />
        </Flex>
      </Flex>
      <RequestHistoryModal
        isOpen={isOpen}
        onClose={onClose}
        type={type}
        status={status}
        createdAt={createdAt}
        dates={dates}
        comment={comment}
      />
    </>
  );
};

export default RequestHistoryComponent;
