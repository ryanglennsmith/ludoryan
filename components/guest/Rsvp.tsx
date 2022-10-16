import { Icon, Button, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import KidsInfo from "./KidsInfo";
import { FaPizzaSlice, FaGuitar } from "react-icons/fa";
import IConfirmedGuest from "../../types/IConfirmedGuest";
import PlusOneInfo from "./PlusOneInfo";
import guestInputContent from "../../resource/guestInputContent";
type Props = {
  openKids: boolean;
  setOpenKids: Function;
  location: string;
  confirmedGuest: IConfirmedGuest;
  setConfirmedGuest: Function;
  language: number;
};
const RsvpComponent = ({
  openKids,
  setOpenKids,
  location,
  confirmedGuest,
  setConfirmedGuest,
  language,
}: Props) => {
  const highlight = useColorModeValue("orange", "lime");
  const [plusOneGo, setPlusOneGo] = useState(true);
  type ObjectKey = keyof typeof confirmedGuest;
  const plusOneLocation = (location + "PlusOne") as ObjectKey;
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
              [plusOneLocation]: confirmedGuest.plusOneFirstName
                ? true
                : undefined,
            })
          }
        >
          {language === 1
            ? guestInputContent.yesItalian
            : guestInputContent.yesEnglish}
        </Button>
        <Button
          onClick={() => {
            setConfirmedGuest({
              ...confirmedGuest,
              [confirmedLocation]: false,
              [plusOneLocation]: undefined,
            });
          }}
        >
          no
        </Button>
      </>

      <>
        <Text>
          {language === 0 && <>{guestInputContent.firstPersonEnglish} </>}
          {confirmedGuest[confirmedLocation] && (
            <Text as="span" color={highlight}>
              {language === 1
                ? guestInputContent.willAttendItalian
                : guestInputContent.willAttendEnglish}
            </Text>
          )}
          {!confirmedGuest[confirmedLocation] && (
            <Text as="span" color="crimson">
              {language === 1
                ? guestInputContent.willNotAttendItalian
                : guestInputContent.willNotAttendEnglish}
            </Text>
          )}{" "}
          in {location}
        </Text>
        {confirmedGuest[confirmedLocation] && (
          <>
            {confirmedGuest.plusOneFirstName && (
              <>
                <Text>
                  ...
                  {plusOneGo && (
                    <Text as="span" color={highlight}>
                      {language === 1
                        ? guestInputContent.withItalian
                        : guestInputContent.withEnglish}
                    </Text>
                  )}
                  {!plusOneGo && (
                    <Text as="span" color="crimson">
                      {language === 1
                        ? guestInputContent.withoutItalian
                        : guestInputContent.withoutEnglish}
                    </Text>
                  )}{" "}
                  {language === 1
                    ? guestInputContent.myPartnerItalian
                    : guestInputContent.myPartnerEnglish}
                </Text>
                <PlusOneInfo
                  location={location}
                  confirmedGuest={confirmedGuest}
                  setConfirmedGuest={setConfirmedGuest}
                  setPlusOneGo={setPlusOneGo}
                />
              </>
            )}
            <KidsInfo
              language={language}
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
