import { Button, Flex, Box, Heading, Icon } from "@chakra-ui/react";
import { FaBomb } from "react-icons/fa";
import { NextPage } from "next";
import Footer from "../components/nav/Footer";
import { useState, useEffect } from "react";
import EnterGuest from "../components/admin/EnterGuest";
import EditGuest from "../components/admin/EditGuest";
import generatePW from "../services/encryption/pwGenerator";
import ServerResponseTable from "../components/admin/ServerResponseTable";

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
  const [isEditGuest, setIsEditGuest] = useState(false);
  const [editGuestField, setEditGuestField] = useState("");
  const [isClickedEdit, setIsClickedEdit] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);

  const resetState = () => {
    setIsEnterGuestInfo(false);
    setIsCheckGuestList(false);
    setServerResponse(undefined);
    setGuestName("");
    setGuestEmail("");
    setPassword("");
    setPlusOne("");
    setIsInvitedToItaly(false);
    setIsInvitedToUSA(false);
    setIsClickedSave(false);
    setIsEditGuest(false);
    setEditGuestField("");
    setIsClickedEdit(false);
    setIsEditingMode(false);
  };

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
              editingMode: isEditingMode,
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
    const getUser = async () => {
      if (editGuestField.length < 1) {
        alert("incomplete data");
      } else {
        const response = await fetch("/api/admin/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: editGuestField,
          }),
        }).then((response) => response.json());
        console.log(response);
        resetState();
        setIsEditingMode(true);
        setIsEnterGuestInfo(true);
        setGuestName(response.createdUser.name);
        setGuestEmail(response.createdUser.email);
        setPlusOne(response.createdUser.plusOneName || null);
        setIsInvitedToItaly(response.createdUser.isInvitedToItaly);
        setIsInvitedToUSA(response.createdUser.isInvitedToUSA);
      }
    };
    if (isClickedSave) {
      saveUser();
      setIsClickedSave(false);
    }
    if (isClickedEdit) {
      getUser();
      setIsClickedEdit(false);
    }
  }, [isClickedSave, isClickedEdit]);
  console.log(`isEditingMode: ${isEditingMode}`);
  return (
    <Box position="relative" minH="100vh">
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        pb="4.5rem"
      >
        {!isEnterGuestInfo && !isCheckGuestList && !isEditGuest && (
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
            generatePW={generatePW}
          />
        )}
        {isEditGuest && (
          <EditGuest
            setEditGuestField={setEditGuestField}
            setIsClickedEdit={setIsClickedEdit}
          />
        )}
        <Flex direction="row" justify="space-evenly" width="50%">
          {!isEnterGuestInfo && (
            <Button
              m={2}
              mb={3}
              onClick={() => {
                resetState();
                setIsEnterGuestInfo(!isEnterGuestInfo);
              }}
            >
              enter guest
            </Button>
          )}
          {!isEditGuest && (
            <Button
              m={2}
              mb={3}
              onClick={() => {
                resetState();
                setIsEditGuest(!isEditGuest);
              }}
            >
              edit guest
            </Button>
          )}
          <Button m={2} mb={3}>
            invitees
          </Button>
          <Button m={2} mb={3}>
            confirmed
          </Button>
        </Flex>
        {isEnterGuestInfo && (
          <Button variant="ghost" onClick={() => resetState()}>
            <Icon color="crimson" as={FaBomb} />
          </Button>
        )}
        {isEditGuest && (
          <Button variant="ghost" onClick={() => resetState()}>
            <Icon color="crimson" as={FaBomb} />
          </Button>
        )}
        {serverResponse && (
          <ServerResponseTable serverResponse={serverResponse} />
        )}
      </Flex>
      <Footer />
    </Box>
  );
};
export default Admin;
