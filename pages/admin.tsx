import {
  Button,
  Flex,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Footer from "../components/nav/Footer";
import { useState, useEffect } from "react";
import EnterGuest from "../components/admin/EnterGuest";
import generatePW from "../services/encryption/pwGenerator";

type user = {
  email: string;
  name: string;
  plusOne?: string;
  isInvitedToItaly?: boolean;
  isInvitedToUSA?: boolean;
};
const Admin: NextPage = () => {
  const [isInvitedToItaly, setIsInvitedToItaly] = useState(false);
  const [isInvitedToUSA, setIsInvitedToUSA] = useState(false);
  const [isEnterGuestInfo, setIsEnterGuestInfo] = useState(false);
  const [isCheckGuestList, setIsCheckGuestList] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [plusOne, setPlusOne] = useState("");
  const [password, setPassword] = useState(generatePW(6));
  const [serverResponse, setServerResponse] = useState<user>();
  const [isClickedSave, setIsClickedSave] = useState(false);

  useEffect(() => {
    const saveUser = async () => {
      if (guestName.length < 1 || guestEmail.length < 1) {
        alert("incomplete data");
      } else {
        const response = await fetch("/api/admin/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: {
              email: guestEmail,
              password: password,
              name: guestName,
              plusOneName: plusOne.length > 0 ? plusOne : null,
              isInvitedToItaly: isInvitedToItaly,
              isInvitedToUSA: isInvitedToUSA,
            },
          }),
        }).then((response) => response.json());
        setServerResponse({
          name: response.createdUser.name,
          email: response.createdUser.email,
          plusOne: response.createdUser.plusOneName || null,
          isInvitedToItaly: response.createdUser.isInvitedToItaly,
          isInvitedToUSA: response.createdUser.isInvitedToUSA,
        });
      }
    };
    if (isClickedSave) {
      saveUser();
      setIsClickedSave(false);
    }
  }, [isClickedSave]);

  console.log(`serverResponse: ${serverResponse}`);
  return (
    <Box position="relative" minH="100vh">
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        pb="4.5rem"
      >
        {!isEnterGuestInfo && !isCheckGuestList && (
          <Heading as="h1" size="2xl" m={3}>
            actions
          </Heading>
        )}
        {isEnterGuestInfo && (
          <EnterGuest
            isInvitedToItaly={isInvitedToItaly}
            setIsInvitedToItaly={setIsInvitedToItaly}
            isInvitedToUSA={isInvitedToUSA}
            setIsInvitedToUSA={setIsInvitedToUSA}
            guestName={guestName}
            setGuestName={setGuestName}
            guestEmail={guestEmail}
            setGuestEmail={setGuestEmail}
            plusOne={plusOne}
            setPlusOne={setPlusOne}
            password={password}
            setPassword={setPassword}
            saveUser={setIsClickedSave}
          ></EnterGuest>
        )}
        <Flex direction="row" justify="space-evenly" width="50%">
          <Button
            m={2}
            mb={3}
            onClick={() => setIsEnterGuestInfo(!isEnterGuestInfo)}
          >
            enter guest
          </Button>
          <Button
            m={2}
            mb={3}
            onClick={() => setIsEnterGuestInfo(!isEnterGuestInfo)}
          >
            edit guest
          </Button>
          <Button m={2} mb={3}>
            invitees
          </Button>
          <Button m={2} mb={3}>
            confirmed
          </Button>
        </Flex>
        {serverResponse && (
          <>
            <Heading as="h3" size="lg" m={2} mb={3}>
              guest
            </Heading>
            <TableContainer>
              <Table variant="simple">
                <TableCaption>
                  {serverResponse.email !== "exists" ? (
                    "guest created"
                  ) : (
                    <Text color="crimson">guest not created</Text>
                  )}
                </TableCaption>
                <Tbody>
                  <Tr>
                    <Td>name</Td>
                    <Td>
                      {serverResponse.email !== "exists" ? (
                        serverResponse.name
                      ) : (
                        <Text color="crimson">{serverResponse.name}</Text>
                      )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>email</Td>
                    <Td>
                      {serverResponse.email !== "exists" ? (
                        serverResponse.name
                      ) : (
                        <Text color="crimson">{serverResponse.email}</Text>
                      )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>plus</Td>
                    <Td>
                      {serverResponse.plusOne ? serverResponse.plusOne : "null"}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>italy</Td>
                    <Td>
                      {serverResponse.isInvitedToItaly ? "true" : "false"}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>usa</Td>
                    <Td>{serverResponse.isInvitedToUSA ? "true" : "false"}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </Flex>
      <Footer />
    </Box>
  );
};
export default Admin;
