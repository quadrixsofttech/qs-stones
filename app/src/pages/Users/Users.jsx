import React, { useContext, useEffect, useState } from 'react';
import { FetchContext } from '../../context/FetchContext';
import DashboardLayout from '../../layout/DashboardLayout';
import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import UserDetails from './UserDetails';
import styles from './Users.styles';


const Users = () => {
  const { protectedFetch } = useContext(FetchContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await protectedFetch.get('users');
        setUsers(data.users);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [protectedFetch]);

  return (
    <DashboardLayout>
      <Heading margin={10}>Users</Heading>
      <TableContainer {...styles.wrapper}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Avatar</Th>
              <Th>Name</Th>
              <Th>E-mail</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!!users.length &&
              users.map((user) => <UserDetails key={user._id} user={user} />)}
          </Tbody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
};

export default Users;
