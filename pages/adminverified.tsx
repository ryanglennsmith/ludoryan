import type {
  NextPage,
  GetServerSidePropsContext,
  GetServerSideProps,
} from "next";

import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import { validateCookie } from "../utils/validateCookie";

type Props = {
  payload: {};
};

const Home: NextPage<Props> = ({ payload }) => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      {/* <div>
        <textarea rows={2} cols={25}></textarea>
      <br />
    <button>Btn</button>
        welcome to the main page
      </div> */}
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>blah</Heading>
        <Box>{JSON.stringify(payload)}</Box>
        {/* <Input
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
        <Button colorScheme="teal" mb={6}>
          Log in
        </Button>
        <Button onClick={toggleColorMode}>Toggle color mode</Button> */}
      </Flex>
    </Flex>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const cookies = ctx.req.cookies;
  const cookieKey = process.env.ADMIN_COOKIE_KEY;
  const cookieValue = process.env.ADMIN_COOKIE_VALUE;
  let payload = {};
  validateCookie(cookies, cookieKey!, cookieValue!)
    ? (payload = { blah: "blah" })
    : payload;
  return { props: { payload } };
};
