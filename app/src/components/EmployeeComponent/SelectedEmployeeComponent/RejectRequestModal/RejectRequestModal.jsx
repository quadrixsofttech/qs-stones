import {
  Button,
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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RenderRangeTags } from '../../../RequestPTOModal/RenderRangeTags';
import { formatTimestampToDate } from '../../../../util';

const RejectRequestModal = ({
  isOpen,
  onClose,
  handleRequst,
  range,
  id,
  type,
}) => {
  const [comment, setComment] = useState('');

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setComment(inputValue);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <Flex flexDir={'column'}>
          <ModalHeader color="gray.700">Reject Request?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={'column'} gap="4">
              <Text color="gray.700">
                {`Are you sure you want to reject the ${type} request for:`}
              </Text>
              <Flex flexWrap={'wrap'} gap="1">
                {range.map((x) => {
                  let startDate = x[0];
                  let endDate = x[1];
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
            </Flex>
            <Flex mt="4">
              <Textarea
                placeholder="Write a comment..."
                size="sm"
                value={comment}
                onChange={handleInputChange}
                rounded={'md'}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={() => handleRequst(id, comment)}>
              Reject
            </Button>
          </ModalFooter>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default RejectRequestModal;
