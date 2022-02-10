import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useMutation } from "urql";
import { UpdateProfileQuery } from "../urql/query";
import { useAuth } from "../hooks/useAuth";

export default function EditProfile() {
  const navigate = useNavigate();
  const {user, setUser} = useAuth();
  const [updateProfileResult, updateProfile] = useMutation(UpdateProfileQuery);

  const onSubmit = async (values: any, actions: any) => {
    try {
      await updateProfile(values);
      const { data } = updateProfileResult;
      if (data) {
        window.localStorage.setItem("User", JSON.stringify(data));
        setUser(data)
      }
    } catch (err: any) {
      throw err;
    }
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
          <Heading fontSize={"4xl"}>Edit profile</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{ phone: "", address: "" }}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Stack spacing={4}>
                  <Field
                    name="phone"
                    validate={(value: string) => {
                      if (!value) return "Phone number is required";
                      if (value.length != 8) return "Invalid phone number";
                    }}
                  >
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.phone && form.touched.phone}
                      >
                        <FormLabel htmlFor="phone">Phone Number</FormLabel>
                        <InputGroup>
                          <InputLeftAddon children="+852" />
                          {/* don't hardcode this */}
                          <Input
                            {...field}
                            type="tel"
                            id="phone"
                            placeholder="phone"
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="address"
                    validate={(value: string) => {
                      if (!value) return "Address is required";
                    }}
                  >
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.address && form.touched.address}
                      >
                        <FormLabel htmlFor="address">Address</FormLabel>
                        <InputGroup size="md">
                          <Input
                            {...field}
                            type="text"
                            id="address"
                            placeholder="address"
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.address}
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
                    Save
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
