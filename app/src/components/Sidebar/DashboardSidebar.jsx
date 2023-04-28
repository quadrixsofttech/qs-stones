import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';
import { BiSwim, BiMicrophone, BiDish } from 'react-icons/bi';

import styles from './DashboardSidebar.styles';

export default function DashboardSidebar() {
  const location = useLocation();
  return (
    <Flex>
      <Box as="aside" {...styles.sideBar}>
        <Flex
          {...styles.sideBarButton}
          as={NavLink}
          to="/dashboard"
          sx={
            location.pathname === '/dashboard'
              ? { ...styles.sideBarButtonActive }
              : { ...styles.sideBarButton }
          }
        >
          <BiSwim size={20} />
          <Text fontSize={'16px'} fontFamily={'Inter'}>
            PTO
          </Text>
        </Flex>
        <Flex
          {...styles.sideBarButton}
          as={NavLink}
          to="/users"
          sx={
            location.pathname === '/users'
              ? { ...styles.sideBarButtonActive }
              : { ...styles.sideBarButton }
          }
        >
          <BiMicrophone size={20} />
          <Text fontFamily={'Inter'}>Conference</Text>
        </Flex>
        <Flex
          {...styles.sideBarButton}
          as={NavLink}
          to="/account"
          sx={
            location.pathname === '/account'
              ? { ...styles.sideBarButtonActive }
              : { ...styles.sideBarButton }
          }
        >
          <BiDish size={20} />
          <Text fontFamily={'Inter'}>Kitchen</Text>
        </Flex>
      </Box>
    </Flex>
  );
}
