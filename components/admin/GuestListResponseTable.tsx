import React from "react";
import {
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Tr,
  Td,
  Thead,
  Button,
  Icon,
} from "@chakra-ui/react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
type user = {
  email: string;
  name: string;
  plusOneName?: string;
  isInvitedToItaly?: boolean;
  isInvitedToUSA?: boolean;
};
type Props = {
  guestList: user[];
  nameSortAsc?: boolean;
  setNameSortAsc: Function;
  emailSortAsc?: boolean;
  setEmailSortAsc: Function;
  isItalyFiltered?: boolean;
  setIsItalyFiltered: Function;
  isUSAFiltered?: boolean;
  setIsUSAFiltered: Function;
  filterState: object;
  setFilterState: Function;
  setIsEnterGuestInfo: Function;
  setIsCheckGuestList: Function;
  setInvitedGuest: Function;
};

const GuestListResponseTable = ({
  guestList,
  nameSortAsc,
  emailSortAsc,
  isItalyFiltered,
  isUSAFiltered,
  setFilterState,
  setIsEnterGuestInfo,
  setIsCheckGuestList,
  setInvitedGuest,
}: Props) => {
  return (
    <>
      <Heading as="h3" size="lg" m={2} mb={3}>
        tentative guest list
      </Heading>
      <TableContainer minW="4xl">
        <Table variant="striped" colorScheme="teal">
          <TableCaption>guest list</TableCaption>
          <Thead>
            <Tr>
              <Td>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFilterState({
                      nameSortAsc:
                        nameSortAsc === undefined ? true : !nameSortAsc,
                      location: {
                        isItalyFiltered: isItalyFiltered,
                        isUSAFiltered: isUSAFiltered,
                      },
                    });
                  }}
                >
                  name{" "}
                  {!nameSortAsc ? (
                    <Icon as={BsArrowUpShort} />
                  ) : (
                    <Icon as={BsArrowDownShort} />
                  )}
                </Button>
              </Td>
              <Td>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFilterState({
                      emailSortAsc: !emailSortAsc,
                      location: {
                        isItalyFiltered: isItalyFiltered,
                        isUSAFiltered: isUSAFiltered,
                      },
                    });
                  }}
                >
                  email
                  {!emailSortAsc ? (
                    <Icon as={BsArrowUpShort} />
                  ) : (
                    <Icon as={BsArrowDownShort} />
                  )}
                </Button>
              </Td>
              <Td>plus</Td>
              <Td>
                <Button
                  variant={isItalyFiltered ? "ghost" : "solid"}
                  colorScheme={isItalyFiltered ? "teal" : "teal"}
                  onClick={() => {
                    setFilterState({
                      nameSortAsc: nameSortAsc,
                      emailSortAsc: emailSortAsc,
                      location: {
                        isItalyFiltered: !isItalyFiltered,
                        isUSAFiltered: isUSAFiltered,
                      },
                    });
                  }}
                >
                  italy
                </Button>
              </Td>
              <Td>
                <Button
                  variant={isUSAFiltered ? "ghost" : "solid"}
                  colorScheme={isUSAFiltered ? "teal" : "teal"}
                  onClick={() => {
                    setFilterState({
                      nameSortAsc: nameSortAsc,
                      emailSortAsc: emailSortAsc,
                      location: {
                        isItalyFiltered: isItalyFiltered,
                        isUSAFiltered: !isUSAFiltered,
                      },
                    });
                  }}
                >
                  usa
                </Button>
              </Td>
              <Td>edit</Td>
            </Tr>
          </Thead>
          <Tbody>
            {guestList?.map((guest) => {
              return (
                <Tr key={guest.email}>
                  <Td>{guest.name}</Td>
                  <Td>{guest.email}</Td>
                  <Td>{guest.plusOneName}</Td>
                  <Td>{guest.isInvitedToItaly?.toString()}</Td>
                  <Td>{guest.isInvitedToUSA?.toString()}</Td>
                  <Td>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsEnterGuestInfo(true);
                        setIsCheckGuestList(false);
                        setInvitedGuest({
                          name: guest.name,
                          email: guest.email,
                          plusOne: guest.plusOneName,
                          italy: guest.isInvitedToItaly,
                          usa: guest.isInvitedToUSA,
                        });
                      }}
                    >
                      <Icon as={FaEdit} />
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GuestListResponseTable;
