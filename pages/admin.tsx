import { Button, Flex, Box, Heading, Icon } from "@chakra-ui/react";
import { FaBomb } from "react-icons/fa";
import { NextPage } from "next";
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
import type IConfirmedGuest from "../types/IConfirmedGuest";
import { ironOptions } from "../lib/ironConfig";
import { withIronSessionSsr } from "iron-session/next";
import { CSVLink } from "react-csv";
import { getAllConfirmedGuests } from "../services/dbTxn/getAllConfirmedGuests";
import ConfirmedGuestResponseTable from "../components/admin/ConfirmedGuestResponseTable";
import { saveUser, getUser } from "../services/submitData/submitGuest";
import getSessionLanguage from "../services/language/getSessionLanguage";
type Props = {
  guestList: InvitedGuest[];
  user: any;
  confirmedGuestList: IConfirmedGuest[];
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

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (user?.isAdmin !== true) {
      return {
        notFound: true,
      };
    }
    const unsortedGuestList = await getAllUsers();
    await closeTxn();
    const guestList = unsortedGuestList;
    const unsortedConfirmedList = await getAllConfirmedGuests();
    await closeTxn();
    const confirmedGuestList = unsortedConfirmedList;
    console.table(confirmedGuestList);
    return {
      props: {
        user: req.session.user,
        guestList,
        confirmedGuestList,
      },
    };
  },
  ironOptions
);

const Admin: NextPage<Props> = ({
  guestList,
  user,
  confirmedGuestList,
}: Props) => {
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
  const [language, setLanguage] = useState(0);
  const [isCheckConfirmedList, setIsCheckConfirmedList] = useState(false);
  const [clientConfirmedList, setClientConfirmedList] =
    useState(confirmedGuestList);
  const resetState = () => {
    setIsEnterGuestInfo(false);
    setIsCheckGuestList(false);
    setIsCheckConfirmedList(false);
    setServerResponse(undefined);
    setInvitedGuest({ email: "", name: "", italy: false, usa: false });
    setIsClickedSave(false);
    setIsEditGuest(false);
    setEditGuestField("");
    setIsClickedEdit(false);
    setIsEditingMode(false);
  };

  useEffect(() => {
    if (isClickedSave) {
      saveUser(invitedGuest, isEditingMode, setServerResponse);
      setIsClickedSave(false);
    }
    if (isClickedEdit) {
      getUser(
        editGuestField,
        resetState,
        setIsEditingMode,
        setIsEnterGuestInfo,
        setInvitedGuest,
        invitedGuest
      );
      setIsClickedEdit(false);
    }
  }, [isClickedSave, isClickedEdit]);
  useEffect(() => {
    setLanguage(getSessionLanguage());
  }, []);
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

  return (
    <Box position="relative" minH="100vh">
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        pb="4.5rem"
      >
        {!isEnterGuestInfo &&
          !isCheckGuestList &&
          !isEditGuest &&
          !isCheckConfirmedList && (
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
            setIsEnterGuestInfo={setIsEnterGuestInfo}
            setIsCheckGuestList={setIsCheckGuestList}
            setInvitedGuest={setInvitedGuest}
          />
        )}
        {isCheckConfirmedList && (
          <ConfirmedGuestResponseTable
            confirmedGuestList={confirmedGuestList}
          ></ConfirmedGuestResponseTable>
        )}
        <Flex direction="column" justify="space-evenly" width="50%">
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
          {!isCheckConfirmedList && (
            <Button
              m={2}
              mb={3}
              onClick={() => {
                resetState();
                setIsCheckConfirmedList(!isCheckConfirmedList);
              }}
            >
              confirmed
            </Button>
          )}
          <CSVLink data={confirmedGuestList}>
            <Button m={2} mb={3}>
              export csv
            </Button>
          </CSVLink>
        </Flex>
        {(isEnterGuestInfo ||
          isEditGuest ||
          isCheckGuestList ||
          isCheckConfirmedList) && (
          <Button variant="ghost" onClick={() => resetState()}>
            <Icon color="crimson" as={FaBomb} />
          </Button>
        )}
        {serverResponse && (
          <GuestResponseTable serverResponse={serverResponse} />
        )}
      </Flex>
      <Footer
        isLoggedIn={user.isLoggedIn}
        language={language}
        setLanguage={setLanguage}
      />
    </Box>
  );
};
export default Admin;
