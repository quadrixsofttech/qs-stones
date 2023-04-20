import {
  Box,
  Flex,
  Button,
  Stack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
  Text,
} from '@chakra-ui/react';
import styles from './Navbar.styles';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';

const DashboardNavbar = () => {
  const auth = useContext(AuthContext);
  return (
    <Box>
      <Flex {...styles.wrapper}>
        <Flex {...styles.logo} as={Link} to={'/dashboard'}>
          <Icon as={FaReact}></Icon>
          <Text {...styles.logoText}>Starter</Text>
        </Flex>

        <Stack {...styles.avatarWrapper}>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to="/account">
                  Account Settings
                </MenuItem>
                {auth?.isAdmin() && (
                  <MenuItem as={Link} to="/users">
                    Users
                  </MenuItem>
                )}
                <MenuDivider />
                <MenuItem onClick={() => auth?.logout()}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};

export default DashboardNavbar;
