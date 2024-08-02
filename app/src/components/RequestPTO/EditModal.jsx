import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
} from '@chakra-ui/react';

export default function EditModal({ isOpen, onClose }) {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change date or type of request</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          Are you sure that you want to delete this request?
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="purple" mr={3}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
