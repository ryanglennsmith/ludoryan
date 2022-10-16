import type { NextPage, GetServerSideProps } from "next";
import NextLink from "next/link";
import Footer from "../components/nav/Footer";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  useColorMode,
  useColorModeValue,
  Link,
  Text,
  Image,
} from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../lib/ironConfig";
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, ...context }) {
    const user = req.session.user;
    if (user) {
      return { props: { user: { isLoggedIn: user.isLoggedIn } } };
    } else {
      return { props: { user: { isLoggedIn: false } } };
    }
  },
  ironOptions
);
const Home: NextPage = ({ user }: any) => {
  console.log(`user isLoggedIn: ${user.isLoggedIn}`);
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  return (
    <Box position="relative" minH="100vh">
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        pb="4.5rem"
        sx={{ border: "2px solid red" }}
      >
        <Flex
          direction="column"
          background={formBackground}
          p={12}
          rounded={6}
          justifyContent="center"
          alignItems="center"
        >
          <Heading mb={6}>Welcome</Heading>
          <Box maxW="lg" mb={6}>
            <Image
              borderRadius={9}
              src="/IMG_20200829_165326.jpg"
              alt="Ludo and Ryan in Wales"
            ></Image>
          </Box>
          <Text p={5}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab saepe
            assumenda, hic error reprehenderit eveniet veniam dignissimos
            praesentium eligendi at accusantium quod sit et, minima ullam atque,
            laborum magnam exercitationem. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolorum ullam distinctio veniam
            perferendis libero optio, vero voluptatem, reiciendis laudantium
            iure amet explicabo temporibus quaerat repellendus magnam ex debitis
            laborum minus?
          </Text>

          <NextLink href="/login" passHref>
            <Link>
              <Button colorScheme="teal" mb={6}>
                Log in
              </Button>
            </Link>
          </NextLink>
        </Flex>{" "}
      </Flex>
      <Footer isLoggedIn={user.isLoggedIn} />
    </Box>
  );
};

export default Home;
