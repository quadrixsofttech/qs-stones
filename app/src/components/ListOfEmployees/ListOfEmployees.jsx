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

const ListOfEmployees = () => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [clickedRowIndex, setClickedRowIndex] = useState(null);

  const handleRowClick = (rowIndex) => {
    if (rowIndex === clickedRowIndex) {
      setClickedRowIndex(null);
    } else {
      setClickedRowIndex(rowIndex);
    }
  };

  const employeeData = [
    { name: 'Ivan Srejic' },
    { name: 'Martini Martini' },
    { name: 'Pera Peric' },
  ];

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
            {employeeData.map((employee, index) => (
              <Tr
                key={index}
                onMouseEnter={() => setHoveredRowIndex(index)}
                onMouseLeave={() => setHoveredRowIndex(null)}
                backgroundColor={index === clickedRowIndex ? 'gray.100' : ''}
                _hover={
                  hoveredRowIndex === index
                    ? { backgroundColor: 'gray.100' }
                    : 'null'
                }
                boxShadow={
                  index === clickedRowIndex
                    ? `inset 0px 0px 0px 1px ${purple400}`
                    : ''
                }
                onClick={() => handleRowClick(index)}
              >
                <Td width={'56px'}>
                  <Avatar size={'xs'} />
                </Td>
                <Td>
                  <Text>{employee.name}</Text>
                </Td>
                <Td>
                  <Flex {...styles.iconBox}>
                    <NotificationIcon number="1" />
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
