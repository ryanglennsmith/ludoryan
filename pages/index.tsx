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

const Home: NextPage = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  return (
    <>
      <Flex alignItems="center" justifyContent="center" direction="column">
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
      <Footer />
    </>
  );
};

export default Home;
