import type { NextPage } from "next";
import Login from "../components/login/Login";
import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  useColorModeValue,
  FormControl,
} from "@chakra-ui/react";
import Footer from "../components/nav/Footer";
import getSessionLanguage from "../services/language/getSessionLanguage";

const Home: NextPage = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [message, setMessage] = useState("not logged in");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState(0);
  useEffect(() => {
    setLanguage(getSessionLanguage());
  }, []);
  return (
    <>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background={formBackground} p={12} rounded={6}>
          <Heading mb={6}>log in</Heading>
          <FormControl>
            <Login
              message={message}
              setMessage={setMessage}
              user={user}
              pw={pw}
              setUser={setUser}
              setPw={setPw}
              sessionUser={user}
            />
          </FormControl>
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
