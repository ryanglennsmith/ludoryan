import { Stack, Icon, Button, Text } from "@chakra-ui/react";
import { FaCheck, FaTimes, FaHeart } from "react-icons/fa";
import React from "react";
import IConfirmedGuest from "../../types/IConfirmedGuest";

type Props = {
  location: string;
  confirmedGuest: IConfirmedGuest;
  setConfirmedGuest: Function;
  setPlusOneGo: Function;
  plusOneGo: boolean;
  language: number;
  highlight: string;
};
const PlusOneInfo = ({
  location,
  confirmedGuest,
  setConfirmedGuest,
  setPlusOneGo,
  plusOneGo,
  language,
  highlight,
}: Props) => {
  type ObjectKey = keyof typeof confirmedGuest;
  const confirmedLocation = (location + "PlusOne") as ObjectKey;
  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          setPlusOneGo(!plusOneGo);
          setConfirmedGuest({
            ...confirmedGuest,
            [confirmedLocation]: !plusOneGo,
          });
        }}
      >
        {!plusOneGo && (
          <Text as="span">
            <Icon as={FaHeart} />
          </Text>
        )}{" "}
        {plusOneGo && (
          <Text as="span">
            {" "}
            <Icon as={FaTimes} />
          </Text>
        )}{" "}
      </Button>
    </>
  );
};

export default PlusOneInfo;
