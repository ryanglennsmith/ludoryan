import type { NextPage, GetServerSideProps } from "next";
import { useEffect, useState } from "react";
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
import mainContent from "../resource/mainContent";
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (user) {
      return { props: { user } };
    } else {
      return { props: { user: { isLoggedIn: false } } };
    }
  },
  ironOptions
);
const Home: NextPage = ({ user }: any) => {
  const { toggleColorMode } = useColorMode();
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
  const formBackground = useColorModeValue("gray.100", "gray.700");
  return (
    <Box position="relative" minH="100vh">
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        pb={{ base: "6rem", md: "4.5rem" }}
        // sx={{ border: "2px solid red" }}
      >
        <Flex
          direction="column"
          background={formBackground}
          p={12}
          rounded={6}
          justifyContent="center"
          alignItems="center"
        >
          <Heading mb={6}>{mainContent.headline}</Heading>
          <Box maxW="lg" mb={6}>
            <Image
              borderRadius={9}
              src={mainContent.homeImage}
              alt={mainContent.homeImageAltText}
            ></Image>
          </Box>
          <Text p={5}>{mainContent.homepageMainText}</Text>
          {!user.isLoggedIn && (
            <NextLink href="/login" passHref>
              <Link>
                <Button colorScheme="teal" mb={6}>
                  log in
                </Button>
              </Link>
            </NextLink>
          )}
          {user.isLoggedIn && (
            <NextLink href={`/${user.id}`} passHref>
              <Link>
                <Button colorScheme="teal" mb={6}>
                  my details
                </Button>
              </Link>
            </NextLink>
          )}
        </Flex>{" "}
      </Flex>
      <Footer
        isLoggedIn={user.isLoggedIn}
        language={language}
        setLanguage={setLanguage}
      />
    </Box>
  );
};

export default Home;
