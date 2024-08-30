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
} from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./ListOfEmployees.styles";
import { BiRightArrowAlt } from "react-icons/bi";
import NotificationIcon from "./notificationIcon";
import { useTheme } from "@emotion/react";

const ListOfEmployees = ({ employees, handleRowClick, clickedRowIndex }) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const theme = useTheme();
  const purple400 = theme.colors.purple[400];

  return (
    <Flex {...styles.mainBox}>
      <Heading as="h2" {...styles.header}>
        List of Employees
      </Heading>
      <TableContainer overflowY={"auto"}>
        <Table variant="simple">
          <Tbody>
            {employees?.map((employee, index) => (
              <Tr
                key={index}
                onMouseEnter={() => setHoveredRowIndex(index)}
                onMouseLeave={() => setHoveredRowIndex(null)}
                backgroundColor={
                  hoveredRowIndex === index || index === clickedRowIndex
                    ? "gray.100"
                    : ""
                }
                boxShadow={
                  index === clickedRowIndex
                    ? `inset 0px 0px 5px 1px ${purple400}`
                    : ""
                }
                onClick={() => handleRowClick(index)}
              >
                <Td width={"56px"}>
                  <Avatar src={employee?.image} />
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
                        number={employee.pendingRequests.length}
                      />
                    )}

                    <BiRightArrowAlt
                      size="20"
                      visibility={
                        hoveredRowIndex === index || index === clickedRowIndex
                          ? "visible"
                          : "hidden"
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
