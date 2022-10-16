import {
  Box,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { FcCopyright } from "react-icons/fc";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { CgLogIn, CgLogOut } from "react-icons/cg";
import NextLink from "next/link";
import Logout from "../login/Logout";
import { US, IT } from "country-flag-icons/react/3x2";
import { useEffect } from "react";
type Props = {
  isLoggedIn: boolean;
  language: number;
  setLanguage: Function;
};
export default function Footer({ isLoggedIn, language, setLanguage }: Props) {
  useEffect(() => {
    
    sessionStorage.setItem("language", language.toString());
  }, [language]);

  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(MoonIcon, SunIcon);
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      position="absolute"
      bottom={0}
      width="100%"
      height="4.5rem"
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <NextLink href="/admin" passHref>
          <Link>
            <Text>
              <Icon as={FcCopyright} /> 2022 Ludo & Ryan
            </Text>
          </Link>
        </NextLink>
        <Stack direction={"row"} spacing={6}>
          {language === 0 && (
            <Button variant="ghost" onClick={() => setLanguage(1)}>
              <Icon as={US} />
            </Button>
          )}
          {language === 1 && (
            <Button variant="ghost" onClick={() => setLanguage(0)}>
              <Icon as={IT} />
            </Button>
          )}
          <NextLink href="/" passHref>
            <Link>
              <Button>
                <Icon as={FaHome} />
              </Button>
            </Link>
          </NextLink>
          {isLoggedIn && <Logout />}
          {!isLoggedIn && (
            <NextLink href="/login" passHref>
              <Link>
                <Button>
                  <Icon as={CgLogIn} />
                </Button>
              </Link>
            </NextLink>
          )}
          <Button onClick={toggleColorMode}>
            <Icon />
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
