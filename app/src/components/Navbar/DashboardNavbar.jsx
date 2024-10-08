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
  Text,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import styles from './Navbar.styles';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { BiBell, BiChevronDown } from 'react-icons/bi';

const DashboardNavbar = () => {
  const auth = useContext(AuthContext);
  const { firstName, lastName, role, image } = auth?.authState.userInfo;
  return (
    <Box>
      <Flex {...styles.wrapper}>
        <Stack {...styles.avatarWrapper}>
          <Flex alignItems={'center'}>
            <Menu>
              <Flex alignItems={'center'}>
                <IconButton
                  size="lg"
                  variant="ghost"
                  aria-label="open menu"
                  icon={<BiBell />}
                />
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                  ml={'2.5'}
                >
                  <Flex alignItems={'center'} gap={'8px'}>
                    <Avatar size={'sm'} marginRight={'1'} src={image} />
                    <Flex
                      alignItems={'flex-start'}
                      flexDirection={'column'}
                      display={{ base: 'none', md: 'flex' }}
                      gap={'1'}
                    >
                      <Text fontSize="sm" color="gray.700">
                        {firstName + ' ' + lastName}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="gray.600"
                        fontWeight={'normal'}
                      >
                        {role}
                      </Text>
                    </Flex>
                    <Icon as={BiChevronDown} color={'gray.600'} />
                  </Flex>
                </MenuButton>
              </Flex>
              <MenuList>
                {/* {auth?.isAdmin() && (
                  <MenuItem as={Link} to="/users">
                    Users
                  </MenuItem>
                )} */}
                <MenuItem as={Link} to="/change-password">
                  Change password
                </MenuItem>
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
