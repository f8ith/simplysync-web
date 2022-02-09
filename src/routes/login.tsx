import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { CreatableSelect } from "chakra-react-select";

export default function Login() {
  const { user, url, setUrl, signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location as any).state?.from?.pathname || "/";
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleLogin = async (values: any, actions: any) => {
    setUrl(values.apiUrl);
    signin(values.email, values.password, (response, error) => {
      if (error) actions.setErrors({ apiUrl: "API is unreachable." });
      if (response?.ok) {
        navigate(from, { replace: true });
      } else {
        actions.setErrors({
          password: "Email or password incorrect",
        });
      }
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to view bookings</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleLogin}
          >
            {(props) => (
              <Form>
                <Stack spacing={4}>
                  <Field
                    name="email"
                    validate={(value: string) => {
                      if (!value) return "Email is required";
                    }}
                  >
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input {...field} id="email" placeholder="Email" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="password"
                    validate={(value: string) => {
                      if (!value) return "Password is required";
                    }}
                  >
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <InputGroup size="md">
                          <Input
                            {...field}
                            id="password"
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Password"
                          />
                          <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                              {show ? "Hide" : "Show"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="apiUrl">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl isRequired>
                        <FormLabel htmlFor="apiUrl">Backend API URL</FormLabel>
                        <CreatableSelect
                          {...field}
                          name="services"
                          closeMenuOnSelect={true}
                          size="md"
                          defaultValue={{
                            label: "localhost",
                            value: "http://localhost:4000",
                          }}
                          options={[
                            {
                              label: "localhost",
                              value: "http://localhost:4000",
                            },
                          ]}
                        />

                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Stack>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  ></Stack>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
