import React, { useContext, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Alert,
  AlertIcon,
  FormErrorMessage,
  Flex,
  Image,
} from "@chakra-ui/react";

import styles from "./Login.styles";
import SignupLayout from "../../layout/SignupLayout/SignupLayout";
import useUser from "../../hooks/useUser";
import { AuthContext } from "../../context/AuthContext";
import QSBigLogo from "../../images/QS-BigLogo.svg";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { authenticate, authenticationLoading } = useUser();
  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const auth = useContext(AuthContext);

  const submitCredentials = async (credentials) => {
    try {
      await authenticate.mutateAsync(credentials);
      setLoginSuccess("Login successful!");
      setLoginError(null);
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700);
    } catch (error) {
      setLoginError(
        error.response?.data?.message || "An unknown error occurred"
      );
      setLoginSuccess(null);
    }
  };

  return (
    <Flex>
      <Flex
        minWidth={"50%"}
        bgColor={"#222222"}
        justifyContent={"center"}
        alignItems={"center"}
        display={{ base: "none", md: "flex" }}
      >
        {" "}
        {/* <QSpaceLogo /> */}
        <Image src={QSBigLogo} alt="QSpace Logo" />
      </Flex>
      {redirectOnLogin && (
        <Navigate to={auth.isNovelicUser() ? "/conference" : "/dashboard"} />
      )}
      <SignupLayout title="Sign in to your account">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => submitCredentials(values)}
          validationSchema={LoginSchema}
        >
          {({ handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              {loginSuccess && (
                <Alert status="success" mb={3}>
                  <AlertIcon />
                  {loginSuccess}
                </Alert>
              )}
              {loginError && (
                <Alert status="error" mb={3}>
                  <AlertIcon />
                  {loginError}
                </Alert>
              )}
              <Stack spacing={3}>
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel>Email address</FormLabel>
                  <Field
                    as={Input}
                    focusBorderColor="purple.500"
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
                    focusBorderColor="purple.500"
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
                    isLoading={authenticationLoading}
                    colorScheme={"purple"}
                  >
                    Sign In
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </SignupLayout>
    </Flex>
  );
};
export default Login;
