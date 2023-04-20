import React, { useState } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Select,
} from '@chakra-ui/react';
import styles from './Account.styles';
import useUser from '../../hooks/useUser';

const Account = () => {
  const { user, setUserRole } = useUser();
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  return (
    <DashboardLayout>
      <Heading>Account Settings</Heading>
      <Box {...styles.card}>
        <FormControl>
          <FormLabel>User Role</FormLabel>
          <Select
            placeholder="Select user role"
            defaultValue={user.role}
            onChange={(e) =>
              setUserRole(
                e.target.value,
                ({ message }) => setSuccessMessage(message),
                ({ message }) => setErrorMessage(message)
              )
            }
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Select>
          <FormHelperText>Select a role for yourself.</FormHelperText>
        </FormControl>
        {successMessage && (
          <Alert status="success" mt={3}>
            <AlertIcon />
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert status="error" mt={3}>
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default Account;
