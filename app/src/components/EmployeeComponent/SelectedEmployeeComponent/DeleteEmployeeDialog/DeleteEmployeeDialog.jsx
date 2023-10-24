import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

const DeleteEmployeeDialog = ({ isOpen, onClose, deleteFn }) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader color={'gray.700'}>
            Delete Employee
          </AlertDialogHeader>

          <AlertDialogBody color="gray.700">
            Are you sure you want to delete this employee?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button color={'gray.700'} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={deleteFn} ml={4}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteEmployeeDialog;
