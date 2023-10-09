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
      <Flex {...styles.header}>
        <Heading as="h2" size="sm" fontWeight={'bold'}>
          List of Employees
        </Heading>
      </Flex>
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
                <Flex justify={'flex-end'} gap="2" alignItems={'center'}>
                  <NotificationIcon number="1" />
                  <BiRightArrowAlt size="20" />
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td width={'56px'}>
                <Avatar size={'xs'} />
              </Td>
              <Td>
                <Text>Ivan Srejic</Text>
              </Td>
              <Td>
                <Flex justify={'flex-end'} gap="2" alignItems={'center'}>
                  <NotificationIcon number="1" />
                  <BiRightArrowAlt size="20" />
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td width={'56px'}>
                <Avatar size={'xs'} />
              </Td>
              <Td>
                <Text>Ivan Srejic</Text>
              </Td>
              <Td>
                <Flex justify={'flex-end'} gap="2" alignItems={'center'}>
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
