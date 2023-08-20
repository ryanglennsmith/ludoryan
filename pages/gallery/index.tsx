import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/ironConfig";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import Footer from "../../components/nav/Footer";
import { useEffect, useState } from "react";
import getSessionLanguage from "../../services/language/getSessionLanguage";
import { NextPage } from "next";

type Props = {
  sessionUser: any;
};
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, ...context }) {
    const sessionUser: any = req.session.user;
    if (
      !sessionUser ||
      (sessionUser?.isAdmin !== true && sessionUser?.isLoggedIn === false)
    ) {
      return { redirect: { destination: "/", permanent: false } };
    }

    return { props: { sessionUser } };
  },
  ironOptions
);
const Gallery: NextPage<Props> = ({ sessionUser }: Props) => {
  const [language, setLanguage] = useState(0);
  useEffect(() => {
    setLanguage(getSessionLanguage());
  }, []);
  return (
    <Box position="relative" minH="100vh">
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        px={3}
        pb={{ base: "6rem", md: "4.5rem" }}
        mt={2}
      >
        <Heading>choose a gallery</Heading>
        <Flex direction="row" p={4}>
          <Link m={4} href="gallery/milano">
            milano
          </Link>
          <Link m={4} href="gallery/memphis">
            memphis
          </Link>
        </Flex>
      </Flex>
      <Footer
        isLoggedIn={sessionUser.isLoggedIn}
        language={language}
        setLanguage={setLanguage}
      />
    </Box>
  );
};
export default Gallery;
