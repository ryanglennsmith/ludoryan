import type { NextPage } from "next";
import Login from "../components/login/Login";
import Logout from "../components/login/Logout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import Footer from "../components/nav/Footer";

const Home: NextPage = () => {
  const { toggleColorMode } = useColorMode();
  const router = useRouter();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");

  const [message, setMessage] = useState("not logged in");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState(0);
  useEffect(() => {
    const getSessionLanguage = (): number => {
      if (sessionStorage.getItem("language") !== undefined) {
        return Number(sessionStorage.getItem("language"));
      } else {
        return 0;
      }
    };
    setLanguage(getSessionLanguage());
  }, []);
  return (
    <>
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
            }}
          ></Input>
          <Input
            placeholder="************"
            variant="filled"
            mb={6}
            type="password"
            onChange={(e) => {
              setPw(e.target.value);
            }}
          ></Input>
          <Login
            message={message}
            setMessage={setMessage}
            user={user}
            pw={pw}
          ></Login>
        </Flex>
      </Flex>
      <Footer
        isLoggedIn={isLoggedIn}
        language={language}
        setLanguage={setLanguage}
      />
    </>
  );
};

export default Home;
