import type { NextPage, GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import Footer from "../components/nav/Footer";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Button,
  useColorMode,
  useColorModeValue,
  Link,
  Text,
  Image,
} from "@chakra-ui/react";
import { CgExternal } from "react-icons/cg";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../lib/ironConfig";
import mainContent from "../resource/mainContent";
import getSessionLanguage from "../services/language/getSessionLanguage";
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
      >
        <Flex
          direction="column"
          background={formBackground}
          p={12}
          rounded={6}
          justifyContent="center"
          alignItems="center"
        >
          {language === 1 ? (
            <>
              <Heading mb={6}>{mainContent.headlineItalian}</Heading>
              <Box maxW="lg" mb={6}>
                <Image
                  borderRadius={9}
                  src={mainContent.homeImage}
                  alt={mainContent.homeImageAltText}
                ></Image>
              </Box>
              <Text p={5} textAlign="left">
                {mainContent.homepageMainTextp1Italian}
              </Text>
              <Text p={5} textAlign="left">
                {mainContent.homepageMainTextp2Italian}
              </Text>
              <Text p={5} textAlign="left">
                {mainContent.italyPartyTextp1Italian}{" "}
                <Link href={mainContent.italyPartyUrl} target="_blank">
                  Cascina Caremma
                  <Icon as={CgExternal} />
                </Link>
                . {mainContent.italyPartyTextp2Italian}
              </Text>
              <Text as="b" p={5} textAlign="left">
                {mainContent.newBusInfoItalian}
                </Text>
              <Text p={5} textAlign="left">
                {mainContent.usaPartyTextItalian}
              </Text>
              <Text p={5} textAlign="left">
                {mainContent.checkBackItalian}
              </Text>
            </>
          ) : (
            <>
              <Heading mb={6}>{mainContent.headline}</Heading>
              <Box maxW="lg" mb={6}>
                <Image
                  borderRadius={9}
                  src={mainContent.homeImage}
                  alt={mainContent.homeImageAltText}
                ></Image>
              </Box>
              <Text p={5} textAlign="left">
                {mainContent.homepageMainTextp1}
              </Text>
              <Text p={5} textAlign="left">
                {mainContent.homepageMainTextp2}
              </Text>
              <Text p={5} textAlign="left">
                {mainContent.usaPartyText}
              </Text>
              <Text p={5} textAlign="left">
                {mainContent.usaUpdatep1} {" "}<Link href={mainContent.usaUpdateUrl}>Soul & Spirits Brewery Taproom<Icon as={CgExternal}/></Link>{", "}{mainContent.usaUpdatep2}
              </Text>
{/* 
              <Text p={5} textAlign="left">
                {mainContent.italyPartyTextp1}{" "}
                <Link href={mainContent.italyPartyUrl} target="_blank">
                  Cascina Caremma
                  <Icon as={CgExternal} />
                </Link>
                . {mainContent.italyPartyTextp2}
              </Text>
              <Text as="b" p={5} textAlign="left">
                {mainContent.newBusInfoEnglish}
              </Text> */}
              {/* <Text p={5} textAlign="left">
                {mainContent.checkBack}
              </Text> */}
            </>
          )}

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
                  {language === 1
                    ? mainContent.myDetailsItalian
                    : mainContent.myDetails}
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
