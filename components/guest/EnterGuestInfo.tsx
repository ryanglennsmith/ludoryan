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
import { FaBus, FaCar } from "react-icons/fa";
import { GuestTemplate } from "@prisma/client";

import RsvpComponent from "./Rsvp";
import type Rsvp from "../../types/Rsvp";
import type Kids from "../../types/Kids";
import ConfirmedGuest from "../../types/ConfirmedGuest";
import DietComponent from "./DietComponent";

type Props = {
  user: GuestTemplate;
  confirmedGuest: ConfirmedGuest;
  setConfirmedGuest: Function;
};

const EnterGuestInfo = ({ user, confirmedGuest, setConfirmedGuest }: Props) => {
  const [openKids, setOpenKids] = useState(false);
  const [openDiet, setOpenDiet] = useState(false);
  const [openPlusDiet, setOpenPlusDiet] = useState(false);
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
      </Text>

      <FormLabel>
        <Heading m={3}>enter or update your info</Heading>
      </FormLabel>
      <InputGroup size="md">
        <Input
          placeholder={user.name}
          variant="filled"
          m={2}
          mb={3}
          onChange={(e) =>
            setConfirmedGuest({ ...confirmedGuest, firstName: e.target.value })
          }
        />
      </InputGroup>
      <InputGroup size="md">
        <Input
          placeholder="last name"
          variant="filled"
          m={2}
          mb={3}
          onChange={(e) =>
            setConfirmedGuest({ ...confirmedGuest, lastName: e.target.value })
          }
        ></Input>
      </InputGroup>
      <Heading size="md" mb={3}>
        rsvp
      </Heading>
      <InputGroup alignItems="center" justifyContent="center">
        <Stack spacing={5} direction="row" mb={3}>
          <Stack spacing={5} direction="column">
            {user.isInvitedToItaly && (
              <RsvpComponent
                openKids={openKids}
                setOpenKids={setOpenKids}
                location="italy"
                confirmedGuest={confirmedGuest}
                setConfirmedGuest={setConfirmedGuest}
              />
            )}
          </Stack>
          <Stack spacing={5} direction="column">
            {user.isInvitedToUSA && (
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
        <>
          <Heading size="md" mb={3}>
            i want to ride the bus in milan
          </Heading>
          <Stack mb={3} spacing={5} direction="column">
            <>
              <Button
                size="md"
                onClick={() => {
                  setConfirmedGuest({
                    ...confirmedGuest,
                    location: { italy: { bus: true } },
                  });
                }}
              >
                <Icon as={FaBus} />
              </Button>
              <Button
                size="md"
                onClick={() => {
                  setConfirmedGuest({
                    ...confirmedGuest,
                    location: { italy: { bus: false } },
                  });
                }}
              >
                <Icon as={FaCar} />
              </Button>
              {confirmedGuest.location?.italy?.bus && (
                <Text>i want to ride the party bus</Text>
              )}
              {!confirmedGuest.location?.italy?.bus && (
                <Text>i will arrange my own travel</Text>
              )}
            </>
          </Stack>
        </>
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
    </Flex>
  );
};

export default EnterGuestInfo;
