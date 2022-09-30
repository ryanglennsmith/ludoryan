import { Button, Flex, Box, Heading, Icon, filter } from "@chakra-ui/react";
import { FaBomb } from "react-icons/fa";
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import Footer from "../components/nav/Footer";
import { useState, useEffect } from "react";
import EnterGuest from "../components/admin/EnterGuest";
import EditGuest from "../components/admin/EditGuest";
import generatePW from "../services/encryption/pwGenerator";
import GuestResponseTable from "../components/admin/GuestResponseTable";
import GuestListResponseTable from "../components/admin/GuestListResponseTable";
import { getAllUsers, closeTxn } from "../services/dbTxn/getAllUsers";
import { sortList } from "../services/sortList";
type User = {
  email: string;
  name: string;
  plusOne?: string;
  isInvitedToItaly?: boolean;
  isInvitedToUSA?: boolean;
};
type Props = {
  guestList: User[];
};

type FilterState = {
  nameSortAsc?: boolean;
  emailSortAsc?: boolean;
  location: {
    isItalyFiltered: boolean;
    isUSAFiltered: boolean;
  };
};

const _fs: FilterState = {
  nameSortAsc: undefined,
  emailSortAsc: undefined,
  location: {
    isItalyFiltered: false,
    isUSAFiltered: false,
  },
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const unsortedGuestList = await getAllUsers();
  await closeTxn();
  const guestList = unsortedGuestList;
  return { props: { guestList } };
};

const Admin: NextPage<Props> = ({ guestList }: Props) => {
  const [isInvitedToItaly, setIsInvitedToItaly] = useState(false);
  const [isInvitedToUSA, setIsInvitedToUSA] = useState(false);
  const [isEnterGuestInfo, setIsEnterGuestInfo] = useState(false);
  const [isCheckGuestList, setIsCheckGuestList] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [plusOne, setPlusOne] = useState("");
  const [password, setPassword] = useState(generatePW(6));
  const [serverResponse, setServerResponse] = useState<User>();
  const [isClickedSave, setIsClickedSave] = useState(false);
  const [isEditGuest, setIsEditGuest] = useState(false);
  const [editGuestField, setEditGuestField] = useState("");
  const [isClickedEdit, setIsClickedEdit] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [clientGuestList, setClientGuestList] = useState(guestList);

  const [nameSortAsc, setNameSortAsc] = useState<boolean | undefined>(true);
  const [emailSortAsc, setEmailSortAsc] = useState<boolean | undefined>(true);
  const [isItalyFiltered, setIsItalyFiltered] = useState<boolean>(false);
  const [isUSAFiltered, setIsUSAFiltered] = useState<boolean>(false);

  const [filterState, setFilterState] = useState<FilterState>(_fs);

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

  useEffect(() => {
    setIsItalyFiltered(filterState.location.isItalyFiltered);
    setIsUSAFiltered(filterState.location.isUSAFiltered);
    setEmailSortAsc(filterState.emailSortAsc);
    setNameSortAsc(filterState.nameSortAsc);
    let sorted: User[];
    if (filterState.emailSortAsc !== undefined) {
      sorted = sortList("email", guestList, filterState.emailSortAsc);
    } else if (filterState.nameSortAsc !== undefined) {
      sorted = sortList("name", guestList, filterState.nameSortAsc);
    } else {
      sorted = guestList;
    }

    const { location } = filterState;
    let filtered;

    if (location.isItalyFiltered && location.isUSAFiltered) {
      setIsItalyFiltered(true);
      setIsUSAFiltered(true);
      filtered = sorted.filter((guest) => {
        return !guest.isInvitedToItaly && !guest.isInvitedToUSA;
      });
    } else if (!location.isItalyFiltered && location.isUSAFiltered) {
      setIsItalyFiltered(false);
      setIsUSAFiltered(true);
      filtered = sorted.filter((guest) => {
        if (guest.isInvitedToItaly) {
          return guest;
        } else {
          return !guest.isInvitedToUSA;
        }
      });
    } else if (location.isItalyFiltered && !location.isUSAFiltered) {
      setIsItalyFiltered(true);
      setIsUSAFiltered(false);
      filtered = sorted.filter((guest) => {
        if (guest.isInvitedToUSA) {
          return guest;
        } else {
          return !guest.isInvitedToItaly;
        }
      });
    } else {
      setIsItalyFiltered(false);
      setIsUSAFiltered(false);
      filtered = sorted;
    }

    setClientGuestList(filtered);
  }, [filterState]);

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
        {isCheckGuestList && (
          <GuestListResponseTable
            guestList={clientGuestList}
            nameSortAsc={nameSortAsc}
            setNameSortAsc={setNameSortAsc}
            emailSortAsc={emailSortAsc}
            setEmailSortAsc={setEmailSortAsc}
            isItalyFiltered={isItalyFiltered}
            setIsItalyFiltered={setIsItalyFiltered}
            isUSAFiltered={isUSAFiltered}
            setIsUSAFiltered={setIsUSAFiltered}
            filterState={filterState}
            setFilterState={setFilterState}
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
          {!isCheckGuestList && (
            <Button
              m={2}
              mb={3}
              onClick={() => {
                resetState();
                setIsCheckGuestList(!isCheckGuestList);
              }}
            >
              invitees
            </Button>
          )}

          <Button m={2} mb={3}>
            confirmed
          </Button>
        </Flex>
        {(isEnterGuestInfo || isEditGuest || isCheckGuestList) && (
          <Button variant="ghost" onClick={() => resetState()}>
            <Icon color="crimson" as={FaBomb} />
          </Button>
        )}
        {serverResponse && (
          <GuestResponseTable serverResponse={serverResponse} />
        )}
      </Flex>
      <Footer />
    </Box>
  );
};
export default Admin;
