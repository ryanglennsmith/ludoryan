/* eslint-disable react/no-unescaped-entities */
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
      <Heading size="xs" p={2}>
        {language === 1
          ? guestInputContent.firstNameItalian
          : guestInputContent.firstNameEnglish}
      </Heading>
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
      <Heading size="xs" p={2}>
        {language === 1
          ? guestInputContent.lastNameItalian
          : guestInputContent.lastNameEnglish}
      </Heading>
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
          <Heading size="xs" p={2}>
            {language === 1
              ? guestInputContent.firstNameItalian
              : guestInputContent.firstNameEnglish}
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
          <Heading size="xs" p={2}>
            {language === 1
              ? guestInputContent.lastNameItalian
              : guestInputContent.lastNameEnglish}
          </Heading>
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

      <Heading size="md" mb={3} textAlign="center" p={3}>
        rsvp
      </Heading>
      <InputGroup alignItems="center" justifyContent="center">
        <Stack spacing={5} direction={{ base: "column", md: "row" }} mb={3}>
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
      {/* bus container */}
      {user.isInvitedToItaly && confirmedGuest.confirmedItaly && (
        <BusComponent
          language={language}
          setConfirmedGuest={setConfirmedGuest}
          confirmedGuest={confirmedGuest}
        />
      )}
      {/* dietary restrictions container */}
      {/* {(confirmedGuest.confirmedItaly || confirmedGuest.confirmedUsa) && (
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
      )} */}
      <Heading size="sm" p={3}>
        {language === 0 ? guestInputContent.anythingElseEnglish : guestInputContent.anythingElseItalian}
      </Heading>
      <p>{language === 0 ? guestInputContent.anythingElseForExampleEnglish : guestInputContent.anythingElseForExampleItalian}</p>
      {/* additional information container */}
      <GuestInfoInputComponent
        placeHolder="anything else?"
        valueToSet={"additionalInformation"}
        setConfirmedGuest={setConfirmedGuest}
        confirmedGuest={confirmedGuest}
        isError={
          confirmedGuest.additionalInformation !== undefined &&
          confirmedGuest.additionalInformation!.length > 500
        }
      />
      {confirmedGuest.additionalInformation !== undefined &&
        confirmedGuest.additionalInformation!.length > 500 && (
          <Text color="crimson" p={4}>
            too many characters
          </Text>
        )}
      <SubmissionModal confirmedGuest={confirmedGuest} language={language} />
    </Flex>
  );
};

export default EnterGuestInfo;
