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

  console.log(comment);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <Flex flexDir={'column'}>
          <ModalHeader>Reject Request?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={'column'} gap="4">
              <Text>
                {`Are you sure you want to reject the ${type} request for:`}
              </Text>
              <Flex flexWrap={'wrap'} gap="1">
                {range.map((x) => {
                  return (
                    <RenderRangeTags
                      range={x}
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
            <Button
              colorScheme="red"
              onClick={() => handleRequst(id, 'rejected', comment)}
            >
              Reject
            </Button>
          </ModalFooter>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default RejectRequestModal;
