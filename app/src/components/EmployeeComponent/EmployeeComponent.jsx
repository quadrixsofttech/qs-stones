import {
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import styles from './EmployeeComponent.styles';
import EmptyEmployeeComponent from './EmptyEmployeeComponent/EmptyEmployeeComponent';
import SelectedEmployeeComponent from './SelectedEmployeeComponent/SelectedEmployeeComponent';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import DeleteEmployeeDialog from './SelectedEmployeeComponent/DeleteEmployeeDialog/DeleteEmployeeDialog';
import useUser from '../../hooks/useUser';

const EmployeeComponent = ({
  isClicked,
  name = 'Quadrix Soft',
  paidTimeOff,
  refetchPTO,
  refetchEmployees,
  employeeId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteEmployee } = useUser();

  const handleDeleteEmployee = async () => {
    try {
      await deleteEmployee.mutateAsync(employeeId);
      onClose();
      refetchEmployees();
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <Flex {...styles.mainBox}>
      {isClicked && (
        <>
          {' '}
          <Flex {...styles.headerBox}>
            <Heading as="h2" {...styles.header}>
              {name}
            </Heading>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<BiEditAlt size="24" />}
                rounded={'50%'}
              />
              <MenuList>
                <MenuItem gap="2" color="gray.700" isDisabled>
                  <BiEditAlt /> Edit
                </MenuItem>
                <MenuItem gap="2" color="gray.700" onClick={onOpen}>
                  <BiTrash />
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <DeleteEmployeeDialog
            isOpen={isOpen}
            onClose={onClose}
            deleteFn={handleDeleteEmployee}
          />
        </>
      )}

      {isClicked ? (
        <SelectedEmployeeComponent
          data={paidTimeOff}
          refetchPTO={refetchPTO}
          refetchEmployees={refetchEmployees}
        />
      ) : (
        <EmptyEmployeeComponent />
      )}
      {/* */}
    </Flex>
  );
};

export default EmployeeComponent;
