import {
  Button,
  Heading,
  Icon,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";
import { GuestTemplate } from "@prisma/client";
import React from "react";
import guestInputContent from "../../resource/guestInputContent";
import IConfirmedGuest from "../../types/IConfirmedGuest";
import { TbCheese } from "react-icons/tb";
import { FaCar, FaCarrot, FaFish } from "react-icons/fa";

type Props = {
  user: GuestTemplate;
  openDiet: boolean;
  setOpenDiet: Function;
  openPlusDiet: boolean;
  setOpenPlusDiet: Function;
  confirmedGuest: IConfirmedGuest;
  setConfirmedGuest: Function;
  language: number;
};
const DietComponent = ({
  user,
  openDiet,
  setOpenDiet,
  openPlusDiet,
  setOpenPlusDiet,
  confirmedGuest,
  setConfirmedGuest,
  language,
}: Props) => {
  return (
    <>
      <Heading size="md" mb={3}>
        {confirmedGuest.firstName}{" "}
        {language === 1
          ? guestInputContent.hasDietaryRequirementsItalian
          : guestInputContent.hasDietaryRequirementsEnglish}
      </Heading>
      <Stack spacing={5} direction="row" mb={3}>
        <Button onClick={() => setOpenDiet(true)}>
          {language === 1
            ? guestInputContent.yesItalian
            : guestInputContent.yesEnglish}
        </Button>
        <Button
          onClick={() => {
            setOpenDiet(false);
            setConfirmedGuest({
              ...confirmedGuest,
              dietaryRestrictions: undefined,
            });
          }}
        >
          no
        </Button>
      </Stack>
      <InputGroup size="md">
        <Stack>
          <Button>
            <Icon as={FaFish} />
          </Button>
          <Button>
            <Icon as={FaCarrot} />
          </Button>
          <Button>
            <Icon as={TbCheese} />
          </Button>

          <Input
            width={400}
            disabled={openDiet ? false : true}
            placeholder={`${confirmedGuest.firstName}: ${
              language === 1
                ? guestInputContent.specialRequirementsItalian
                : guestInputContent.specialRequirementsEnglish
            }`}
            value={confirmedGuest.dietaryRestrictions || ""}
            variant="filled"
            m={2}
            mb={3}
            onChange={(e) =>
              setConfirmedGuest({
                ...confirmedGuest,
                dietaryRestrictions: e.target.value,
              })
            }
          ></Input>
        </Stack>
      </InputGroup>
      {confirmedGuest.plusOneFirstName && (
        <>
          <Heading size="md" mb={3}>
            {confirmedGuest.plusOneFirstName}{" "}
            {language === 1
              ? guestInputContent.hasDietaryRequirementsItalian
              : guestInputContent.hasDietaryRequirementsEnglish}
          </Heading>
          <Stack spacing={5} direction="row" mb={3}>
            <Button onClick={() => setOpenPlusDiet(true)}>
              {language === 1
                ? guestInputContent.yesItalian
                : guestInputContent.yesEnglish}
            </Button>
            <Button
              onClick={() => {
                setOpenPlusDiet(false);
                setConfirmedGuest({
                  ...confirmedGuest,
                  plusOneDietaryRestrictions: undefined,
                });
              }}
            >
              no
            </Button>
          </Stack>
          <InputGroup size="md">
            <Input
              placeholder={`${confirmedGuest.plusOneFirstName}: ${
                language === 1
                  ? guestInputContent.specialRequirementsItalian
                  : guestInputContent.specialRequirementsEnglish
              }`}
              value={confirmedGuest.plusOneDietaryRestrictions}
              variant="filled"
              disabled={openPlusDiet ? false : true}
              m={2}
              mb={3}
              onChange={(e) =>
                setConfirmedGuest({
                  ...confirmedGuest,
                  plusOneDietaryRestrictions: e.target.value,
                })
              }
            ></Input>
          </InputGroup>
        </>
      )}
    </>
  );
};

export default DietComponent;
