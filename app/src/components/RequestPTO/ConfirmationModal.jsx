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
  handleRemoteDeletion,
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
          <Button colorScheme="red" mr={3} onClick={handleRemoteDeletion}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
