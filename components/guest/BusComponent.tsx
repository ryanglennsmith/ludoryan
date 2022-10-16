import { Heading, Stack, Button, Icon, Text } from "@chakra-ui/react";
import React from "react";
import IConfirmedGuest from "../../types/IConfirmedGuest";
import { FaBus, FaCar } from "react-icons/fa";
import guestInputContent from "../../resource/guestInputContent";
type Props = {
  setConfirmedGuest: Function;
  confirmedGuest: IConfirmedGuest;
  language: number;
};

const BusComponent = ({
  setConfirmedGuest,
  confirmedGuest,
  language,
}: Props) => {
  return (
    <>
      <Heading size="md" mb={3}>
        {language === 1
          ? guestInputContent.transportTitleItalian
          : guestInputContent.transportTitleEnglish}
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
          {confirmedGuest.italyBus && (
            <Text>
              {language === 1
                ? guestInputContent.rideTheBusItalian
                : guestInputContent.rideTheBusEnglish}
            </Text>
          )}
          {!confirmedGuest.italyBus && (
            <Text>
              {language === 1
                ? guestInputContent.notRideTheBusItalian
                : guestInputContent.notRideTheBusEnglish}
            </Text>
          )}
        </>
      </Stack>
    </>
  );
};

export default BusComponent;
