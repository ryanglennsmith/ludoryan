import {
  Button,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import IConfirmedGuest from "../../types/IConfirmedGuest";
type Props = {
  confirmedGuestList: IConfirmedGuest[];
};
const ConfirmedGuestResponseTable = ({ confirmedGuestList }: Props) => {
  return (
    <>
      <Heading as="h3" size="lg" m={2} mb={3}>
        confirmed guest list
      </Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>guest list</TableCaption>
          <Thead>
            <Tr>
              <Td>
                {/* <Button variant="ghost"></Button> */}
                first name
              </Td>
              <Td>last name</Td>
              <Td>partner first name</Td>
              <Td>partner last name</Td>
              <Td>confirmed to italy</Td>
              <Td>confirmed to usa</Td>
              <Td>kids in italy</Td>
              <Td>kids in usa</Td>
              <Td>riding the bus</Td>
              <Td>dietary restrictions</Td>
              <Td>partner dietary restrictions</Td>
            </Tr>
          </Thead>
          <Tbody>
            {confirmedGuestList.map((guest) => {
              return (
                <Tr key={guest.id}>
                  <Td>{guest.firstName}</Td>
                  <Td>{guest.lastName}</Td>
                  <Td>{guest.plusOneFirstName}</Td>
                  <Td>{guest.plusOneLastName}</Td>
                  <Td>{guest?.confirmedItaly?.toString()}</Td>
                  <Td>{guest?.confirmedUsa?.toString()}</Td>
                  <Td>{guest.italyKids}</Td>
                  <Td>{guest.usaKids}</Td>
                  <Td>{guest.italyBus}</Td>
                  <Td>{guest.dietaryRestrictions}</Td>
                  <Td>{guest.plusOneDietaryRestrictions}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ConfirmedGuestResponseTable;
