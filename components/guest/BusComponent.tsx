import { Heading, Stack, Button, Icon, Text } from "@chakra-ui/react";
import React from "react";
import ConfirmedGuest from "../../types/ConfirmedGuest";
import { FaBus, FaCar } from "react-icons/fa";
type Props = {
  setConfirmedGuest: Function;
  confirmedGuest: ConfirmedGuest;
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
                location: { italy: { bus: true } },
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
                location: { italy: { bus: false } },
              });
            }}
          >
            <Icon as={FaCar} />
          </Button>
          {confirmedGuest.location?.italy?.bus && (
            <Text>i want to ride the party bus</Text>
          )}
          {!confirmedGuest.location?.italy?.bus && (
            <Text>i will arrange my own travel</Text>
          )}
        </>
      </Stack>
    </>
  );
};

export default BusComponent;
