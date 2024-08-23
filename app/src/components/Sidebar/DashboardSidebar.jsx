import React, { useState } from 'react';
import { Box, Fade, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { BiSwim, BiChalkboard, BiUser, BiUserPlus } from 'react-icons/bi';
import styles from './DashboardSidebar.styles';
import QuadrixSoftLogo from '../QuadrixSoftLogo/QuadrixSoftLogo';
import useUser from '../../hooks/useUser';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import QSLogo from '../../images/qs-logo.png';

const DashboardSidebar = () => {
  const { user } = useUser();
  const [shrinkSidebar, setShrinkSidebar] = useState(
    JSON.parse(localStorage.getItem('shrink-state')) || false
  );

  const handleShrinkSidebar = () => {
    const newShrinkState = !shrinkSidebar;
    setShrinkSidebar(newShrinkState);
    localStorage.setItem('shrink-state', JSON.stringify(newShrinkState));
  };

  return (
    <Flex>
      <Box
        as="aside"
        {...(shrinkSidebar ? styles.colapsedSidebar : styles.sideBar)}
      >
        <Flex {...styles.shrinker} onClick={handleShrinkSidebar}>
          <Icon
            as={shrinkSidebar ? MdKeyboardArrowRight : MdKeyboardArrowLeft}
            boxSize={5}
          />
        </Flex>
        <Box marginBottom={'6'}>
          {shrinkSidebar ? (
            <Image src={QSLogo} w={8} h={8} />
          ) : (
            <QuadrixSoftLogo />
          )}
        </Box>
        {user.role !== 'novelic-user' && (
          <Flex
            {...(shrinkSidebar
              ? styles.colapsedSideBarButton
              : styles.sideBarButton)}
            as={NavLink}
            to="/dashboard"
          >
            <BiSwim size={20} />
            {!shrinkSidebar && <Text>Remote/TO</Text>}
          </Flex>
        )}
        <Flex
          {...(shrinkSidebar
            ? styles.colapsedSideBarButton
            : styles.sideBarButton)}
          as={NavLink}
          to="/conference"
        >
          <BiChalkboard size={20} />
          {!shrinkSidebar && <Text>Conference</Text>}
        </Flex>
        {user.role === 'admin' && (
          <>
            <Flex
              {...(shrinkSidebar
                ? styles.colapsedSideBarButton
                : styles.sideBarButton)}
              as={NavLink}
              to="/admin"
            >
              <BiUser size={20} />
              {!shrinkSidebar && <Text>Admin</Text>}
            </Flex>
            <Flex
              {...(shrinkSidebar
                ? styles.colapsedSideBarButton
                : styles.sideBarButton)}
              as={NavLink}
              to="/signup"
            >
              <BiUserPlus size={25} />
              {!shrinkSidebar && <Text>Add a user</Text>}
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default DashboardSidebar;
