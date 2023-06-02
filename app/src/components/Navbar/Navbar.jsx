import { Box, Flex, Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styles from './Navbar.styles';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import QuadrixSoftLogo from '../QuadrixSoftLogo';

const Navbar = () => {
  const auth = useContext(AuthContext);
  return (
    <Box>
      <Flex {...styles.wrapper} justifyContent={'space-between'}>
        <Flex {...styles.logo} as={Link} to={'/'}>
          <QuadrixSoftLogo />
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
