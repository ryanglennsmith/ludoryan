import { Heading, Stack, Button, Icon, Text } from "@chakra-ui/react";
import React from "react";
import IConfirmedGuest from "../../types/IConfirmedGuest";
import { FaBus, FaCar } from "react-icons/fa";
import { IGuestInputContent } from "../../resource/guestInputContent";
type Props = {
  setConfirmedGuest: Function;
  confirmedGuest: IConfirmedGuest;
  language: number;
  guestInputContent: IGuestInputContent;
};

const BusComponent = ({
  setConfirmedGuest,
  confirmedGuest,
  language,
  guestInputContent
}: Props) => {
  return (
    <Stack spacing={3} mb={3} justifyContent="center" alignItems="center">
      <Heading size="md" mb={3}>
        {language === 1
          ? guestInputContent.transportTitleItalian
          : guestInputContent.transportTitleEnglish}
      </Heading>
      <Stack mb={3} spacing={5} direction="row">
        <>
          <Button
            colorScheme={confirmedGuest.italyBus ? "teal" : undefined}
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
            colorScheme={!confirmedGuest.italyBus ? "teal" : undefined}
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
        </>
      </Stack>
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
    </Stack>
  );
};

export default BusComponent;
