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
import React, { useState } from 'react';
import styles from './ListOfEmployees.styles';
import { BiRightArrowAlt } from 'react-icons/bi';
import NotificationIcon from './notificationIcon';
import { useTheme } from '@emotion/react';
import useUser from '../../hooks/useUser';

const ListOfEmployees = ({ employees, handleRowClick, clickedRowIndex }) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const { user } = useUser();

  const theme = useTheme();
  const purple400 = theme.colors.purple[400];

  return (
    <Flex {...styles.mainBox}>
      <Heading as="h2" {...styles.header}>
        List of Employees
      </Heading>
      <TableContainer overflowY={'auto'}>
        <Table variant="simple">
          <Tbody>
            {employees?.map((employee, index) => (
              <Tr
                key={index}
                onMouseEnter={() => setHoveredRowIndex(index)}
                onMouseLeave={() => setHoveredRowIndex(null)}
                backgroundColor={
                  hoveredRowIndex === index || index === clickedRowIndex
                    ? 'gray.100'
                    : ''
                }
                boxShadow={
                  index === clickedRowIndex
                    ? `inset 0px 0px 0px 1px ${purple400}`
                    : ''
                }
                onClick={() => handleRowClick(index)}
              >
                <Td width={'56px'}>
                  <Avatar
                    name="Dan Abrahmov"
                    src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671128.jpg?w=1380&t=st=1698316598~exp=1698317198~hmac=42e84dedfe0182d353b0a9f7a207b0faa954a6db032f288b2cc5fd0ba2b1c7cb"
                  />
                </Td>
                <Td>
                  <Text color="gray.700">
                    {employee?.firstName} {employee?.lastName}
                  </Text>
                </Td>
                <Td>
                  <Flex {...styles.iconBox}>
                    {employee.pendingRequests.length > 0 && (
                      <NotificationIcon
                        number={
                          employee.pendingRequests.length
                        }
                      />
                    )}

                    <BiRightArrowAlt
                      size="20"
                      visibility={
                        hoveredRowIndex === index || index === clickedRowIndex
                          ? 'visible'
                          : 'hidden'
                      }
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default ListOfEmployees;
