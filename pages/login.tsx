import type { NextPage } from "next";
import Login from "../components/login/Login";
import Logout from "../components/login/Logout";
import CheckLogin from "../components/login/CheckLogin";
import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  useColorMode,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

const Home: NextPage = () => {
  const [message, setMessage] = useState("funky butt lovin");

  const [isLoggedIn, setIsLoggedIn] = useState("?");

  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <Login message={message} setMessage={() => setMessage}></Login>
        <CheckLogin></CheckLogin>
        <p style={{ color: "red" }}>{isLoggedIn}</p>
        <Logout></Logout>

        <Button onClick={toggleColorMode}>Toggle color mode</Button>
      </Flex>
    </Flex>
  );
};

export default Home;
