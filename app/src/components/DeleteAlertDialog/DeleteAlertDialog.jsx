import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import useConference from '../../hooks/useConference';
import styles from './DeleteAlertDialog.styles';

const DeleteAlertDialog = ({
  isOpen,
  onClose,
  idToDelete,
  refetchReservations,
  closeModal,
}) => {
  const { deleteReservation } = useConference();
  const deleteConferenceReservation = async (id) => {
    try {
      await deleteReservation.mutateAsync(id);
      onClose();
      refetchReservations();
      closeModal();
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader {...styles.title}>
            Delete Reservation
          </AlertDialogHeader>

          <AlertDialogBody color="gray.700">
            Are you sure you want to delete this reservation?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button color={'gray.700'} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                deleteConferenceReservation(idToDelete);
              }}
              ml={4}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
