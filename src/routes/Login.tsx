import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useGoogleLogin } from "react-google-login";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState(null);
  const { gSignin } = useGoogleAuth();
  const navigate = useNavigate();

  const onSuccess = (gRes: any) => {
    gSignin(gRes.tokenId, (res?: Response, err?: any) => {
      if (err) setError(err);
      if (res!.status == 201) navigate("/profile/edit");
      else if (res!.status == 200) navigate("/");
    });
  };

  const onFailure = (res: any) => {
    throw res.error;
  };

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID!;

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
  });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to start booking</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={10}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              onClick={signIn}
            >
              Sign in with Google
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
