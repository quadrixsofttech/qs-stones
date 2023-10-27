import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';

const DeleteEmployeeDialog = ({ isOpen, onClose, deleteFn }) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader color={'gray.700'}>Delete User</AlertDialogHeader>

          <AlertDialogBody>
            <Text color="gray.700">
              Are you sure you want to delete this user?
            </Text>
            <Flex
              flexDirection={'column'}
              color="red.500"
              backgroundColor="red.50"
              p="4"
              mt="3"
              borderRadius={'md'}
            >
              <Flex align={'center'} gap="1">
                <Icon as={WarningTwoIcon} boxSize={4} />
                <Text fontWeight={'bold'}>Warning</Text>
              </Flex>
              <Text mt="3">
                Deleting this user erases their account and all data
                permanently. This action is irreversible with no way to recover.
              </Text>
            </Flex>
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
