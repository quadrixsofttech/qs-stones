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
            <Flex flexWrap={'wrap'} pt="4" pb="4">
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
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RequestHistoryComponent;
