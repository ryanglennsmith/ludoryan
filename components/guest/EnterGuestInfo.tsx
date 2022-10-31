import React, { useState } from "react";
import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Stack,
  Text,
  Icon,
} from "@chakra-ui/react";
import { GuestTemplate } from "@prisma/client";

import RsvpComponent from "./Rsvp";
import IConfirmedGuest from "../../types/IConfirmedGuest";
import DietComponent from "./DietComponent";
import SubmissionModal from "./SubmissionModal";
import BusComponent from "./BusComponent";
import GuestInfoInputComponent from "./GuestInfoInputComponent";
import guestInputContent from "../../resource/guestInputContent";

type Props = {
  user: GuestTemplate;
  confirmedGuest: IConfirmedGuest;
  setConfirmedGuest: Function;
  language: number;
};

const EnterGuestInfo = ({
  user,
  confirmedGuest,
  setConfirmedGuest,
  language,
}: Props) => {
  const [openKids, setOpenKids] = useState(false);
  const [openDiet, setOpenDiet] = useState(false);
  const [openPlus, setOpenPlus] = useState(true);
  const [openPlusOneDiet, setOpenPlusOneDiet] = useState(false);

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" m={2}>
      <FormLabel>
        <Heading m={3} textAlign="center">
          {language === 1
            ? guestInputContent.headlineItalian
            : guestInputContent.headlineEnglish}
        </Heading>
      </FormLabel>

      <GuestInfoInputComponent
        placeHolder={
          confirmedGuest.firstName
            ? confirmedGuest.firstName
            : language === 1
            ? guestInputContent.firstNameItalian
            : guestInputContent.firstNameEnglish
        }
        valueToSet={"firstName"}
        setConfirmedGuest={setConfirmedGuest}
        confirmedGuest={confirmedGuest}
      />
      <GuestInfoInputComponent
        placeHolder={
          language === 1
            ? guestInputContent.lastNameItalian
            : guestInputContent.lastNameEnglish
        }
        valueToSet={"lastName"}
        setConfirmedGuest={setConfirmedGuest}
        confirmedGuest={confirmedGuest}
      />
      {openPlus && (
        <>
          <Heading m={3} size="md" textAlign="center">
            {language === 1
              ? guestInputContent.plusOneItalian
              : guestInputContent.plusOneEnglish}
          </Heading>
          <GuestInfoInputComponent
            placeHolder={
              confirmedGuest.plusOneFirstName
                ? confirmedGuest.plusOneFirstName
                : language === 1
                ? guestInputContent.firstNameItalian
                : guestInputContent.firstNameEnglish
            }
            valueToSet={"plusOneFirstName"}
            setConfirmedGuest={setConfirmedGuest}
            confirmedGuest={confirmedGuest}
          />
          <GuestInfoInputComponent
            placeHolder={
              language === 1
                ? guestInputContent.lastNameItalian
                : guestInputContent.lastNameEnglish
            }
            valueToSet={"plusOneLastName"}
            setConfirmedGuest={setConfirmedGuest}
            confirmedGuest={confirmedGuest}
          />
        </>
      )}

      <Heading size="md" mb={3} textAlign="center">
        rsvp
      </Heading>
      <InputGroup alignItems="center" justifyContent="center">
        <Stack spacing={5} direction="row" mb={3}>
          <Stack spacing={5} direction="column">
            {confirmedGuest.invitedToItaly && (
              <>
                <RsvpComponent
                  language={language}
                  openKids={openKids}
                  setOpenKids={setOpenKids}
                  location="italy"
                  confirmedGuest={confirmedGuest}
                  setConfirmedGuest={setConfirmedGuest}
                />
              </>
            )}
          </Stack>
          <Stack spacing={5} direction="column">
            {confirmedGuest.invitedToUSA && (
              <RsvpComponent
                language={language}
                openKids={openKids}
                setOpenKids={setOpenKids}
                location="usa"
                confirmedGuest={confirmedGuest}
                setConfirmedGuest={setConfirmedGuest}
              />
            )}
          </Stack>
        </Stack>
      </InputGroup>
      {user.isInvitedToItaly && confirmedGuest.confirmedItaly && (
        <BusComponent
          language={language}
          setConfirmedGuest={setConfirmedGuest}
          confirmedGuest={confirmedGuest}
        />
      )}
      {(confirmedGuest.confirmedItaly || confirmedGuest.confirmedUsa) && (
        <DietComponent
          language={language}
          user={user}
          openDiet={openDiet}
          setOpenDiet={setOpenDiet}
          openPlusOneDiet={openPlusOneDiet}
          setOpenPlusOneDiet={setOpenPlusOneDiet}
          confirmedGuest={confirmedGuest}
          setConfirmedGuest={setConfirmedGuest}
        ></DietComponent>
      )}
      <SubmissionModal confirmedGuest={confirmedGuest} language={language} />
    </Flex>
  );
};

export default EnterGuestInfo;
