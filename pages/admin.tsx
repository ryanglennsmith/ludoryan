import type { NextPage } from "next";
import Login from "../components/login/Login";
import Logout from "../components/login/Logout";
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
import CheckLogin from "../components/login/CheckLogin";

const Home: NextPage = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [message, setMessage] = useState("funky butt lovin");
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <Input
          placeholder="bob@bob.bob"
          variant="filled"
          mb={3}
          type="email"
          onChange={(e) => {
            setUser(e.target.value);
            console.log(user);
          }}
        ></Input>
        <Input
          placeholder="************"
          variant="filled"
          mb={6}
          type="password"
          onChange={(e) => {
            setPw(e.target.value);
            console.log(pw);
          }}
        ></Input>
        <Login
          message={message}
          setMessage={setMessage}
          user={user}
          pw={pw}
        ></Login>
        <Logout></Logout>
        <CheckLogin></CheckLogin>
        <Button onClick={toggleColorMode}>Toggle color mode</Button>
      </Flex>
    </Flex>
  );
};

export default Home;
