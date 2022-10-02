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

import type InvitedGuest from "../types/InvitedGuest";

// type User = {
//   email: string;
//   name: string;
//   plusOne?: string;
//   isInvitedToItaly?: boolean;
//   isInvitedToUSA?: boolean;
// };
type Props = {
  guestList: InvitedGuest[];
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
  const [invitedGuest, setInvitedGuest] = useState<InvitedGuest>({
    email: "",
    name: "",
    italy: false,
    usa: false,
  });

  const [isEnterGuestInfo, setIsEnterGuestInfo] = useState(false);
  const [isCheckGuestList, setIsCheckGuestList] = useState(false);
  const [serverResponse, setServerResponse] = useState<InvitedGuest>();
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
    setInvitedGuest({ email: "", name: "", italy: false, usa: false });
    setIsClickedSave(false);
    setIsEditGuest(false);
    setEditGuestField("");
    setIsClickedEdit(false);
    setIsEditingMode(false);
  };

  useEffect(() => {
    const saveUser = async () => {
      if (
        invitedGuest.name.length < 1 ||
        invitedGuest.email.length < 1 ||
        invitedGuest.password === undefined
      ) {
        alert("incomplete data");
      } else {
        const response = await fetch("/api/admin/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: {
              email: invitedGuest.email,
              password: invitedGuest.password,
              name: invitedGuest.name,
              plusOneName:
                invitedGuest.plusOne !== undefined
                  ? invitedGuest.plusOne
                  : null,
              isInvitedToItaly: invitedGuest.italy,
              isInvitedToUSA: invitedGuest.usa,
              editingMode: isEditingMode,
            },
          }),
        }).then((response) => response.json());
        setServerResponse({
          name: response.createdUser.name,
          email: response.createdUser.email,
          plusOne: response.createdUser.plusOneName || null,
          italy: response.createdUser.isInvitedToItaly,
          usa: response.createdUser.isInvitedToUSA,
          id: response.createdUser.id,
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
        setInvitedGuest({
          ...invitedGuest,
          name: response.createdUser.name,
          email: response.createdUser.email,
          plusOne: response.createdUser.plusOneName || null,
          italy: response.createdUser.isInvitedToItaly,
          usa: response.createdUser.isInvitedToUSA,
        });
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
    let sorted: InvitedGuest[];
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
        return !guest.italy && !guest.usa;
      });
    } else if (!location.isItalyFiltered && location.isUSAFiltered) {
      setIsItalyFiltered(false);
      setIsUSAFiltered(true);
      filtered = sorted.filter((guest) => {
        if (guest.italy) {
          return guest;
        } else {
          return !guest.usa;
        }
      });
    } else if (location.isItalyFiltered && !location.isUSAFiltered) {
      setIsItalyFiltered(true);
      setIsUSAFiltered(false);
      filtered = sorted.filter((guest) => {
        if (guest.usa) {
          return guest;
        } else {
          return !guest.italy;
        }
      });
    } else {
      setIsItalyFiltered(false);
      setIsUSAFiltered(false);
      filtered = sorted;
    }

    setClientGuestList(filtered);
  }, [filterState]);

  console.log(invitedGuest);

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
            invitedGuest={invitedGuest}
            setInvitedGuest={setInvitedGuest}
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
