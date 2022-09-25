import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { CgLogIn, CgLogOut } from "react-icons/cg";
import NextLink from "next/link";

export default function Footer() {
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
            <Text>© 2022 Ludo & Ryan</Text>
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
          <NextLink href="/login" passHref>
            <Link>
              <Button>
                <Icon as={CgLogIn} />
              </Button>
            </Link>
          </NextLink>
          <Button onClick={toggleColorMode}>
            <Icon />
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
