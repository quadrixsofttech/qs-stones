import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link, Navigate } from 'react-router-dom';
import SignupLayout from '../../layout/SignupLayout/SignupLayout';
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import styles from './Signup.styles';
import useRegisterMutation from './../../hooks/useUser';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Signup = () => {
  const [signupSuccess, setSignupSuccess] = useState();
  const [signupError, setSignupError] = useState();
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const { registerMutation,isLoading  } = useRegisterMutation();

  const submitCredentials = async (credentials) => {
    try {
      await registerMutation.mutateAsync(credentials);
      setSignupSuccess('Registration successful!');
      setSignupError(null);
      setTimeout(() => {
        setRedirectOnLogin(!loginLoading);
      }, 700);
    } catch (error) {
      setSignupError(error.message);
      setSignupSuccess(null);
    } finally {
      setLoginLoading(loginLoading);
    }
  };

  return (
    <>
      {redirectOnLogin && <Navigate to="/dashboard" />}
      <SignupLayout
        title="Sign up for an account"
        subtitle={
          <>
            Already have an account?
            <Text as={Link} to="/login" color={'blue.400'} ml={1}>
              Log in now
            </Text>
          </>
        }
      >
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          onSubmit={(values) => submitCredentials(values)}
          validationSchema={SignupSchema}
        >
          {({ handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              {signupSuccess && (
                <Alert status="success" mb={3}>
                  <AlertIcon />
                  {signupSuccess}
                </Alert>
              )}
              {signupError && (
                <Alert status="error" mb={3}>
                  <AlertIcon />
                  {signupError}
                </Alert>
              )}
              <Stack spacing={3}>
                <HStack spacing={3}>
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel>First Name</FormLabel>
                    <Field
                      as={Input}
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                    />
                    {errors.firstName && touched.firstName ? (
                      <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel>Last Name</FormLabel>
                    <Field
                      as={Input}
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                    />
                    {errors.lastName && touched.lastName ? (
                      <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                </HStack>
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel>Email address</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email address"
                  />
                  {errors.email && touched.email ? (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel>Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  {errors.password && touched.password ? (
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <Stack>
                  <Button
                    {...styles.button}
                    type="submit"
                    isLoading={isLoading}
                  >
                    Sign Up
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </SignupLayout>
    </>
  );
};

export default Signup;
