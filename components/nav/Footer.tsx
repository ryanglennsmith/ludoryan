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
type Props = {
  isLoggedIn: boolean;
};
export default function Footer({ isLoggedIn }: Props) {
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
