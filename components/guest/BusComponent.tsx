import { Heading, Stack, Button, Icon, Text } from "@chakra-ui/react";
import React from "react";
import IConfirmedGuest from "../../types/IConfirmedGuest";
import { FaBus, FaCar } from "react-icons/fa";
type Props = {
  setConfirmedGuest: Function;
  confirmedGuest: IConfirmedGuest;
};

const BusComponent = ({ setConfirmedGuest, confirmedGuest }: Props) => {
  return (
    <>
      <Heading size="md" mb={3}>
        i want to ride the bus in milan
      </Heading>
      <Stack mb={3} spacing={5} direction="column">
        <>
          <Button
            size="md"
            onClick={() => {
              setConfirmedGuest({
                ...confirmedGuest,
                italyBus: true,
              });
            }}
          >
            <Icon as={FaBus} />
          </Button>
          <Button
            size="md"
            onClick={() => {
              setConfirmedGuest({
                ...confirmedGuest,
                italyBus: false,
              });
            }}
          >
            <Icon as={FaCar} />
          </Button>
          {confirmedGuest.italyBus && <Text>i want to ride the party bus</Text>}
          {!confirmedGuest.italyBus && (
            <Text>i will arrange my own travel</Text>
          )}
        </>
      </Stack>
    </>
  );
};

export default BusComponent;
