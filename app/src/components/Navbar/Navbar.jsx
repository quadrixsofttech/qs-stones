import { Box, Flex, Button, Stack, Icon, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styles from './Navbar.styles';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaReact } from 'react-icons/fa';
import { QuadrixSoftLogoSmall } from '../QuadrixSoftLogo';

const Navbar = () => {
  const auth = useContext(AuthContext);
  return (
    <Box>
      <Flex {...styles.wrapper}>
        <Flex {...styles.logo} as={Link} to={'/'}>
          <QuadrixSoftLogoSmall />
        </Flex>

        <Stack {...styles.buttonWrapper}>
          {auth?.isAuthenticated() ? (
            <>
              <Button {...styles.signupButton} as={Link} to="/dashboard">
                Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button {...styles.loginButton} as={Link} to="/login">
                Sign In
              </Button>
              <Button {...styles.signupButton} as={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;
