import {
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Tr,
  Td,
  Text,
} from "@chakra-ui/react";
import React from "react";
type user = {
  email: string;
  name: string;
  plusOne?: string;
  italy: boolean;
  usa: boolean;
  id?: string;
};
type Props = {
  serverResponse: user;
};

const GuestResponseTable = ({ serverResponse }: Props) => {
  return (
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
                  serverResponse.email
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
              <Td>{serverResponse.italy.toString()}</Td>
            </Tr>
            <Tr>
              <Td>usa</Td>
              <Td>{serverResponse.usa.toString()}</Td>
            </Tr>
            <Tr>
              <Td>id</Td>
              <Td>{serverResponse.id}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GuestResponseTable;
