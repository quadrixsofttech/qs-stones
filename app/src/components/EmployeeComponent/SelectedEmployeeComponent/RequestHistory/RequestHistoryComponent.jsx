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
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import styles from './RequestHistory.styles';
import RequestStatusWrapper from '../../../RequestPTO/RequestStatus/RequestStatus';
import { BiCommentDetail } from 'react-icons/bi';

const RequestHistoryComponent = ({ createdAt, dates, comment, status }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        {...styles.requestHistoryBox}
        onClick={onOpen}
        borderColor={isOpen ? 'purple.400' : 'gray.200'}
      >
        <Flex height={'100%'} alignItems="center">
          <Text {...styles.createdAt}>{createdAt}</Text>
          <Divider {...styles.divider} />
          {/* Ovde izmapiraj dates, i formatiraj YYYY/MM/DD */}
          <Text {...styles.dates}>{dates}</Text>
        </Flex>
        <Flex {...styles.statusBox}>
          {comment && <BiCommentDetail size="20" />}
          <RequestStatusWrapper status={status} />
        </Flex>
      </Flex>
      {/* Ovaj modal je cisto tu radi funckionalnosti, kasnije se kreiraju modali za rejected i za approved */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RequestHistoryComponent;