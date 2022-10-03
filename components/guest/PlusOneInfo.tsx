import { Stack, Text, Icon, Button } from "@chakra-ui/react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import React, { useState } from "react";
import ConfirmedGuest from "../../types/ConfirmedGuest";

type Props = {
  location: string;
  confirmedGuest: ConfirmedGuest;
  setConfirmedGuest: Function;
  setPlusOneGo: Function;
};
const PlusOneInfo = ({
  location,
  confirmedGuest,
  setConfirmedGuest,
  setPlusOneGo,
}: Props) => {
  type ObjectKey = keyof typeof confirmedGuest;
  const confirmedLocation = location as ObjectKey;
  return (
    <>
      <Stack spacing={5} direction="column">
        <Button
          onClick={() => {
            setPlusOneGo(true);
            setConfirmedGuest({
              ...confirmedGuest,
              location: { [confirmedLocation]: { plusOne: true } },
            });
          }}
        >
          <Icon as={FaHeart} />
        </Button>

        <Button
          onClick={() => {
            setPlusOneGo(false);
            setConfirmedGuest({
              ...confirmedGuest,
              location: { [confirmedLocation]: { plusOne: false } },
            });
          }}
        >
          <Icon as={FaHeartBroken} />
        </Button>
      </Stack>
    </>
  );
};

export default PlusOneInfo;
