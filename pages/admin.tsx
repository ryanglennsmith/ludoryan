import type { NextPage, GetServerSideProps } from "next";
import { setCookie } from "cookies-next";
import NextLink from "next/link";

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
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const addAuth = setCookie("rgs", "123456789");

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      {/* <div>
        <textarea rows={2} cols={25}></textarea>
      <br />
    <button>Btn</button>
        welcome to the main page
      </div> */}
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <Input
          placeholder="bob@bob.bob"
          variant="filled"
          mb={3}
          type="email"
        ></Input>
        <Input
          placeholder="************"
          variant="filled"
          mb={6}
          type="password"
        ></Input>
        <NextLink href="/adminverified" passHref>
          <Link>
            <Button onClick={() => addAuth} colorScheme="teal" mb={6}>
              Log in
            </Button>
          </Link>
        </NextLink>

        <Button onClick={toggleColorMode}>Toggle color mode</Button>
      </Flex>
    </Flex>
  );
};

export default Home;
