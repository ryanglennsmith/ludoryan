import { Icon, Button, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import KidsInfo from "./KidsInfo";
import type Rsvp from "../../types/Rsvp";
import type Kids from "../../types/Kids";
import { FaPizzaSlice, FaGuitar } from "react-icons/fa";
import ConfirmedGuest from "../../types/ConfirmedGuest";
type Props = {
  openKids: boolean;
  setOpenKids: Function;
  location: string;
  confirmedGuest: ConfirmedGuest;
  setConfirmedGuest: Function;
};
const RsvpComponent = ({
  openKids,
  setOpenKids,
  location,
  confirmedGuest,
  setConfirmedGuest,
}: Props) => {
  const highlight = useColorModeValue("orange", "lime");

  type ObjectKey = keyof typeof confirmedGuest;

  const confirmedLocation = ("confirmed" +
    location.charAt(0).toUpperCase() +
    location.slice(1)) as ObjectKey;
  return (
    <>
      {location === "italy" && <Icon as={FaPizzaSlice} alignSelf="center" />}
      {location === "usa" && <Icon as={FaGuitar} alignSelf="center" />}

      <>
        <Button
          onClick={() =>
            setConfirmedGuest({
              ...confirmedGuest,
              [confirmedLocation]: true,
            })
          }
        >
          yes
        </Button>
        <Button
          onClick={() => {
            setConfirmedGuest({
              ...confirmedGuest,
              [confirmedLocation]: false,
            });
          }}
        >
          no
        </Button>
      </>

      <>
        <Text>
          i{" "}
          {confirmedGuest[confirmedLocation] && (
            <Text as="span" color={highlight}>
              will
            </Text>
          )}
          {!confirmedGuest[confirmedLocation] && (
            <Text as="span" color="crimson">
              will not
            </Text>
          )}{" "}
          attend in {location}
        </Text>
        {confirmedGuest[confirmedLocation] && (
          <KidsInfo
            openKids={openKids}
            setOpenKids={setOpenKids}
            location={location}
            confirmedGuest={confirmedGuest}
            setConfirmedGuest={setConfirmedGuest}
          ></KidsInfo>
        )}
      </>
    </>
  );
};

export default RsvpComponent;
