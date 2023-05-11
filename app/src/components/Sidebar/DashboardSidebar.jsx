import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { BiSwim, BiMicrophone, BiDish } from 'react-icons/bi';

import styles from './DashboardSidebar.styles';

const DashboardSidebar = () => {
  return (
    <Flex>
      <Box as="aside" {...styles.sideBar}>
        <Flex {...styles.sideBarButton} as={NavLink} to="/dashboard">
          <BiSwim size={20} />
          <Text>PTO</Text>
        </Flex>
        <Flex {...styles.sideBarButton} as={NavLink} to="/users">
          <BiMicrophone size={20} />
          <Text>Conference</Text>
        </Flex>
        <Flex {...styles.sideBarButton} as={NavLink} to="/account">
          <BiDish size={20} />
          <Text>Kitchen</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default DashboardSidebar;
