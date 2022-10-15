import { Stack, Icon, Button } from "@chakra-ui/react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import React from "react";
import IConfirmedGuest from "../../types/IConfirmedGuest";

type Props = {
  location: string;
  confirmedGuest: IConfirmedGuest;
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
  const confirmedLocation = (location + "PlusOne") as ObjectKey;
  return (
    <>
      <Stack spacing={5} direction="column">
        <Button
          onClick={() => {
            setPlusOneGo(true);
            setConfirmedGuest({
              ...confirmedGuest,
              [confirmedLocation]: true,
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
              [confirmedLocation]: false,
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
