import { Stack, Button, Icon, Input, Text } from "@chakra-ui/react";
import { FaCheck, FaChild, FaWineBottle, FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import IConfirmedGuest from "../../types/IConfirmedGuest";
import guestInputContent from "../../resource/guestInputContent";

type Props = {
  openKids: boolean;
  setOpenKids: Function;
  location: string;
  confirmedGuest: IConfirmedGuest;
  setConfirmedGuest: Function;
  language: number;
  highlight: string;
};
const KidsInfo = ({
  openKids,
  setOpenKids,
  location,
  confirmedGuest,
  setConfirmedGuest,
  language,
  highlight,
}: Props) => {
  type LocationObjectKey = keyof typeof confirmedGuest.italyKids;
  const confirmedLocationKids = (location + "Kids") as LocationObjectKey;

  return (
    <>
      <Stack spacing={5} direction="column">
              <p>with children: </p><Input
              width="min"
              placeholder="0"
              type="number"
              onChange={(e) => {
                setConfirmedGuest({
                  ...confirmedGuest,
                  [confirmedLocationKids]: Number(e.target.value),
                });
              }}
            /> 

        {/* {openKids && (
          <Text>
            {language === 1
              ? guestInputContent.withKidsItalian
              : guestInputContent.withKidsEnglish}
          </Text>
        )}
        {!openKids && (
          <Text>
            {language === 1
              ? guestInputContent.withoutKidsItalian
              : guestInputContent.withoutKidsEnglish}
          </Text>
        )}
        <Button onClick={() => setOpenKids(!openKids)}>
          {openKids && <Icon as={FaTimes} />}
          {!openKids && <Icon as={FaChild} />}
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
        )} */}
      </Stack>
    </>
  );
};

export default KidsInfo;
