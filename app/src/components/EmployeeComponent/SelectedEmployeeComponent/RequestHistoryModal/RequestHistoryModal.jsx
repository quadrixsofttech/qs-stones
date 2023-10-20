import React from 'react';
import RequestHistory from '../RequestHistory/RequestHistory';
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
import { capitalizeFirstLetter } from '../../../../util';

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
            <Flex align={'center'} gap="1">
              <Text color="gray.700">{capitalizeFirstLetter(type)}</Text>
              <RequestStatusWrapper status={status} />
            </Flex>
            <Text fontSize={'xs'} color="gray.700" fontWeight={'400'}>
              {moment(createdAt).format('YYYY/MM/DD hh:mm')}
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p="4">
          <Flex flexWrap={'wrap'} mb="4">
            {dates.map((range) => {
              return (
                <RenderRangeTags
                  range={range}
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
