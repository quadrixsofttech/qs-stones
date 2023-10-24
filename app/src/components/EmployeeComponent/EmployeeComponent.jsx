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

const EmployeeComponent = ({
  isClicked,
  name = 'Quadrix Soft',
  paidTimeOff,
  refetchPTO,
  refetchEmployees,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteEmployee = () => {
    alert('employee deleted');
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
            deleteFn={deleteEmployee}
          />
        </>
      )}

      {isClicked ? (
        <SelectedEmployeeComponent data={paidTimeOff} refetchPTO={refetchPTO} />
      ) : (
        <EmptyEmployeeComponent />
      )}
      {/* */}
    </Flex>
  );
};

export default EmployeeComponent;
