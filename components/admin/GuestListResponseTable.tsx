import React from "react";
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
} from "@chakra-ui/react";
type user = {
  email: string;
  name: string;
  plusOneName?: string;
  isInvitedToItaly?: boolean;
  isInvitedToUSA?: boolean;
};
type Props = {
  guestList: user[];
};

const GuestListResponseTable = ({ guestList }: Props) => {
  return (
    <>
      <Heading as="h3" size="lg" m={2} mb={3}>
        tentative guest list
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            {/* TODO make conditional based on filtering */}
            guest list
          </TableCaption>
          <Thead>
            <Tr>
              <Td>name</Td>
              <Td>email</Td>
              <Td>plus</Td>
              <Td>italy</Td>
              <Td>usa</Td>
            </Tr>
          </Thead>
          <Tbody>
            {guestList.map((guest) => {
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
