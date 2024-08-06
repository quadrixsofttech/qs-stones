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

export default function ConfirmationModal({
  isOpen,
  onClose,
  handleRequestDeletion,
}) {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Warning!</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          Are you sure that you want to delete this request?
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="red" ml={3} onClick={handleRequestDeletion}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
