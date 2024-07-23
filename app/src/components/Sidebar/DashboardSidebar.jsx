import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { BiSwim, BiChalkboard, BiUser, BiUserPlus } from 'react-icons/bi';

import styles from './DashboardSidebar.styles';
import QuadrixSoftLogo from '../QuadrixSoftLogo/QuadrixSoftLogo';
import useUser from '../../hooks/useUser';

const DashboardSidebar = () => {
  const { user } = useUser();

  return (
    <Flex>
      <Box as="aside" {...styles.sideBar}>
        <Box marginBottom={'6'}>
          <QuadrixSoftLogo />
        </Box>
        {user.role !== 'novelic-user' && (
          <Flex {...styles.sideBarButton} as={NavLink} to="/dashboard">
            <BiSwim size={20} />
            <Text>Remote/Time off</Text>
          </Flex>
        )}
        <Flex {...styles.sideBarButton} as={NavLink} to="/conference">
          <BiChalkboard size={20} />
          <Text>Conference</Text>
        </Flex>
        {user.role === 'admin' && (
          <>
            <Flex {...styles.sideBarButton} as={NavLink} to="/admin">
              <BiUser size={20} />
              <Text>Admin</Text>
            </Flex>
            <Flex {...styles.sideBarButton} as={NavLink} to="/signup">
              <BiUserPlus size={25} />
              <Text>Add a user</Text>
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default DashboardSidebar;
