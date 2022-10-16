import { Stack, Button, Icon, Input, Text } from "@chakra-ui/react";
import { FaChild, FaWineBottle } from "react-icons/fa";
import React from "react";
import IConfirmedGuest from "../../types/IConfirmedGuest";
import guestInputContent from "../../resource/guestInputContent";

type Props = {
  openKids: boolean;
  setOpenKids: Function;
  location: string;
  confirmedGuest: IConfirmedGuest;
  setConfirmedGuest: Function;
  language: number;
};
const KidsInfo = ({
  openKids,
  setOpenKids,
  location,
  confirmedGuest,
  setConfirmedGuest,
  language,
}: Props) => {
  type LocationObjectKey = keyof typeof confirmedGuest.italyKids;
  const confirmedLocationKids = (location + "Kids") as LocationObjectKey;

  return (
    <>
      <Stack spacing={5} direction="column">
        <Text>
          {language === 1
            ? guestInputContent.withKidsItalian
            : guestInputContent.withKidsEnglish}
        </Text>
        <Button onClick={() => setOpenKids(true)}>
          <Icon as={FaChild} />
        </Button>
        {openKids && (
          <>
            <Text>
              {language === 1
                ? guestInputContent.howManyItalian
                : guestInputContent.howManyEnglish}
            </Text>
            <Input
              placeholder="0"
              type="number"
              value={confirmedGuest[confirmedLocationKids]}
              onChange={(e) => {
                setConfirmedGuest({
                  ...confirmedGuest,
                  [confirmedLocationKids]: Number(e.target.value),
                });
              }}
            />
          </>
        )}
        <Text>
          {language === 1
            ? guestInputContent.withoutKidsItalian
            : guestInputContent.withoutKidsEnglish}
        </Text>
        <Button
          onClick={() => {
            setConfirmedGuest({
              ...confirmedGuest,

              [confirmedLocationKids]: 0,
            });
          }}
        >
          <Icon as={FaWineBottle} />
        </Button>
      </Stack>
    </>
  );
};

export default KidsInfo;
