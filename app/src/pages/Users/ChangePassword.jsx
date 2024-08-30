import { useState } from "react";
import SignupLayout from "../../layout/SignupLayout/SignupLayout";
import { Link, Navigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import useUser from "../../hooks/useUser";

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("You must type in your old password"),
  newPassword: Yup.string().required("You must type in your new password"),
});

const ChangePassword = () => {
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [successfullPasswordChange, setSuccessfullPasswordChange] =
    useState("");
  const [passwordChangeError, setPasswordChangeError] = useState(false);
  const { changePassword } = useUser();

  const handleSubmitCredientals = async (credentials) => {
    try {
      await changePassword.mutateAsync(credentials);
      setSuccessfullPasswordChange("Password changed successfully");
      setPasswordChangeError(null);
      setTimeout(() => {
        setRedirectOnLogin(!redirectOnLogin);
      }, 700);
    } catch (error) {
      setPasswordChangeError(
        error.response?.data?.message || "Failed to change password"
      );
      setSuccessfullPasswordChange("");
    }
  };

  return (
    <>
      {redirectOnLogin && <Navigate to={"/dashboard"} />}
      <SignupLayout title="Change password">
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
          }}
          onSubmit={(values) => handleSubmitCredientals(values)}
          validationSchema={ChangePasswordSchema}
        >
          {({ handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              {successfullPasswordChange && (
                <Alert status="success" mb={3}>
                  <AlertIcon />
                  {successfullPasswordChange}
                </Alert>
              )}
              {passwordChangeError && (
                <Alert status="error" mb={3}>
                  <AlertIcon />
                  {passwordChangeError}
                </Alert>
              )}
              <Stack spacing={3}>
                <FormControl
                  isInvalid={!!errors.oldPassword && touched.oldPassword}
                >
                  <FormLabel>Old password</FormLabel>
                  <Field
                    as={Input}
                    id="oldPassword"
                    type="password"
                    name="oldPassword"
                    placeholder="Old password"
                  />
                  {errors.oldPassword && touched.oldPassword ? (
                    <FormErrorMessage>{errors.oldPassword}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel>New password</FormLabel>
                  <Field
                    as={Input}
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    placeholder="New password"
                  />
                  {errors.newPassword && touched.newPassword ? (
                    <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <Stack>
                  <Button colorScheme="blue" type="submit">
                    Change password
                  </Button>
                  <Button type="submit" as={Link} to="/dashboard">
                    Go back
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

export default ChangePassword;
