import React, { useState } from "react";
import {
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Tr,
  Td,
  Text,
  Thead,
  Button,
  Icon,
} from "@chakra-ui/react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
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
  resetFiltersNot: Function;
  setCurrentFilterState: Function;
};

const GuestListResponseTable = ({
  guestList,
  nameSortAsc,
  setNameSortAsc,
  emailSortAsc,
  setEmailSortAsc,
  isItalyFiltered,
  setIsItalyFiltered,
  isUSAFiltered,
  setIsUSAFiltered,
  resetFiltersNot,
  setCurrentFilterState,
}: Props) => {
  return (
    <>
      <Heading as="h3" size="lg" m={2} mb={3}>
        tentative guest list
      </Heading>
      <TableContainer minW="4xl">
        <Table variant="striped" colorScheme="teal">
          <TableCaption>
            {/* TODO make conditional based on filtering */}
            guest list
          </TableCaption>
          <Thead>
            <Tr>
              <Td>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setNameSortAsc(
                      nameSortAsc === undefined ? true : !nameSortAsc
                    );
                    setCurrentFilterState({
                      isNameAscending: nameSortAsc,
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
                    setEmailSortAsc(
                      emailSortAsc === undefined ? true : !emailSortAsc
                    );
                    setCurrentFilterState({ isEmailAscending: emailSortAsc });
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
                    setIsItalyFiltered(
                      isItalyFiltered === undefined ? true : !isItalyFiltered
                    );
                    setCurrentFilterState({ isItalyFiltered: isItalyFiltered });
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
                    setIsUSAFiltered(
                      isUSAFiltered === undefined ? true : !isUSAFiltered
                    );
                    setCurrentFilterState({ isUSAFiltered: isUSAFiltered });
                  }}
                >
                  usa
                </Button>
              </Td>
            </Tr>
          </Thead>
          <Tbody>
            {guestList?.map((guest) => {
              return (
                // TODO Sort out why ? don't populate
                <Tr key={guest.email}>
                  <Td>{guest.name}</Td>
                  <Td>{guest.email}</Td>
                  <Td>{guest.plusOneName}</Td>
                  <Td>{guest.isInvitedToItaly?.toString()}</Td>
                  <Td>{guest.isInvitedToUSA?.toString()}</Td>
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
