import React, { useEffect, useState } from "react";
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
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { GuestTemplate } from "@prisma/client";

import RsvpComponent from "./Rsvp";

import ConfirmedGuest from "../../types/ConfirmedGuest";
import DietComponent from "./DietComponent";
import SubmissionModal from "./SubmissionModal";
import BusComponent from "./BusComponent";
import GuestInfoInputComponent from "./GuestInfoInputComponent";
import PlusOneInfo from "./PlusOneInfo";

type Props = {
  user: GuestTemplate;
  confirmedGuest: ConfirmedGuest;
  setConfirmedGuest: Function;
};

const EnterGuestInfo = ({ user, confirmedGuest, setConfirmedGuest }: Props) => {
  const [openKids, setOpenKids] = useState(false);
  const [openDiet, setOpenDiet] = useState(false);
  const [openPlus, setOpenPlus] = useState(user.plusOneName !== null);
  const [cancelPlus, setCancelPlus] = useState(false);
  const [openPlusDiet, setOpenPlusDiet] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  return (
    <Flex
      w="2xl"
      direction="column"
      alignItems="center"
      justifyContent="center"
      m={2}
    >
      <Text>
        hello {user.name}
        <br />
        {user.plusOneName && (
          <>
            and {user.plusOneName}
            <br />
          </>
        )}
        {user.email}
        <br />
        {user.id}
        <br />
        italy: {user.isInvitedToItaly.toString()}
        <br />
        usa: {user.isInvitedToUSA.toString()}
        <br />
      </Text>

      <FormLabel>
        <Heading m={3}>enter or update your info</Heading>
      </FormLabel>

      <GuestInfoInputComponent
        placeHolder={confirmedGuest.firstName || "first name"}
        valueToSet={"firstName"}
        setConfirmedGuest={setConfirmedGuest}
        confirmedGuest={confirmedGuest}
      />
      <GuestInfoInputComponent
        placeHolder={"last name"}
        valueToSet={"lastName"}
        setConfirmedGuest={setConfirmedGuest}
        confirmedGuest={confirmedGuest}
      />
      {openPlus && (
        <>
          <Heading m={3} size="md">
            and my partner
          </Heading>
          <GuestInfoInputComponent
            placeHolder={confirmedGuest.plusOneFirstName! || "first name"}
            valueToSet={"plusOneFirstName"}
            setConfirmedGuest={setConfirmedGuest}
            confirmedGuest={confirmedGuest}
          />
          <GuestInfoInputComponent
            placeHolder={"last name"}
            valueToSet={"plusOneLastName"}
            setConfirmedGuest={setConfirmedGuest}
            confirmedGuest={confirmedGuest}
          />
        </>
      )}

      <Heading size="md" mb={3}>
        rsvp
      </Heading>
      <InputGroup alignItems="center" justifyContent="center">
        <Stack spacing={5} direction="row" mb={3}>
          <Stack spacing={5} direction="column">
            {confirmedGuest.invitedToItaly && (
              <>
                <RsvpComponent
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
          setConfirmedGuest={setConfirmedGuest}
          confirmedGuest={confirmedGuest}
        />
      )}
      {(confirmedGuest.confirmedItaly || confirmedGuest.confirmedUsa) && (
        <DietComponent
          user={user}
          openDiet={openDiet}
          setOpenDiet={setOpenDiet}
          openPlusDiet={openPlusDiet}
          setOpenPlusDiet={setOpenPlusDiet}
          confirmedGuest={confirmedGuest}
          setConfirmedGuest={setConfirmedGuest}
        ></DietComponent>
      )}
      <SubmissionModal confirmedGuest={confirmedGuest} />
    </Flex>
  );
};

export default EnterGuestInfo;
