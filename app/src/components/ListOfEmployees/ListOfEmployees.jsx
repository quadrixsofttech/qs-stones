import {
  Avatar,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import styles from './ListOfEmployees.styles';
import { BiRightArrowAlt } from 'react-icons/bi';
import NotificationIcon from './notificationIcon';

const ListOfEmployees = () => {
  return (
    <Flex {...styles.mainBox}>
      <Heading as="h2" {...styles.header}>
        List of Employees
      </Heading>
      <TableContainer overflowY={'auto'}>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td width={'56px'}>
                <Avatar size={'xs'} />
              </Td>
              <Td>
                <Text>Ivan Srejic</Text>
              </Td>
              <Td>
                <Flex {...styles.iconBox}>
                  <NotificationIcon number="1" />
                  <BiRightArrowAlt size="20" />
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default ListOfEmployees;
