import {
  Button,
  Flex,
  Input,
  Box,
  Heading,
  Checkbox,
  CheckboxGroup,
  Text,
  Stack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Footer from "../components/nav/Footer";
import { useState } from "react";
import EnterGuest from "../components/admin/EnterGuest";

const Admin: NextPage = () => {
  const [isInvitedToItaly, setIsInvitedToItaly] = useState(false);
  const [isInvitedToUSA, setIsInvitedToUSA] = useState(false);
  const [isEnterGuestInfo, setIsEnterGuestInfo] = useState(false);
  const [isCheckGuestList, setIsCheckGuestList] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [plusOne, setPlusOne] = useState("");

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
      </Flex>
      <Footer />
    </Box>
  );
};
export default Admin;
