import React from 'react';
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from '@chakra-ui/react';
import RequestStatusWrapper from '../../../RequestPTO/RequestStatus/RequestStatus';
import { RenderRangeTags } from '../../../RequestPTOModal/RenderRangeTags';
import moment from 'moment';
import { capitalizeFirstLetter, formatTimestampToDate } from '../../../../util';
import styles from './RequestHistoryModal.styles';

const RequestHistoryModal = ({
  isOpen,
  onClose,
  type,
  status,
  createdAt,
  dates,
  comment,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex flexDir={'column'} gap="1">
            <Flex align={'center'} gap={2.5}>
              <Text color="gray.700">{capitalizeFirstLetter(type)}</Text>
              <RequestStatusWrapper status={status} />
            </Flex>
            <Text {...styles.createdAtText}>
              {moment(createdAt).format('YYYY/MM/DD hh:mm')}
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p="4">
          <Flex flexWrap={'wrap'} mb="4">
            {dates.map((range) => {
              let startDate = range[0];
              let endDate = range[1];
              let dates = [];
              dates.push(formatTimestampToDate(startDate));
              dates.push(formatTimestampToDate(endDate));
              return (
                <RenderRangeTags
                  range={dates}
                  key={Math.random()}
                  showClose={false}
                />
              );
            })}
          </Flex>
          <Flex>
            {comment && <Textarea isDisabled placeholder={comment} />}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RequestHistoryModal;
