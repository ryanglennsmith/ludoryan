import { Icon, Button, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import KidsInfo from "./KidsInfo";
import { FaPizzaSlice, FaGuitar } from "react-icons/fa";
import ConfirmedGuest from "../../types/ConfirmedGuest";
import PlusOneInfo from "./PlusOneInfo";
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
  const [plusOneGo, setPlusOneGo] = useState(true);
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
          <>
            {confirmedGuest.plusOneFirstName && (
              <>
                <Text>
                  ...
                  {plusOneGo && (
                    <Text as="span" color={highlight}>
                      with
                    </Text>
                  )}
                  {!plusOneGo && (
                    <Text as="span" color="crimson">
                      without
                    </Text>
                  )}{" "}
                  my partner
                </Text>
                <PlusOneInfo
                  location="italy"
                  confirmedGuest={confirmedGuest}
                  setConfirmedGuest={setConfirmedGuest}
                  setPlusOneGo={setPlusOneGo}
                />
              </>
            )}
            <KidsInfo
              openKids={openKids}
              setOpenKids={setOpenKids}
              location={location}
              confirmedGuest={confirmedGuest}
              setConfirmedGuest={setConfirmedGuest}
            ></KidsInfo>
          </>
        )}
      </>
    </>
  );
};

export default RsvpComponent;
