import React, { useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Icon,
} from "@chakra-ui/react";
import {
  FaPizzaSlice,
  FaGuitar,
  FaBus,
  FaCar,
  FaChild,
  FaHandMiddleFinger,
} from "react-icons/fa";
import { GuestTemplate } from "@prisma/client";
import KidsInfo from "./KidsInfo";

import RsvpComponent from "./Rsvp";
import type Rsvp from "../../types/Rsvp";
import type Kids from "../../types/Kids";

type Props = {
  user: GuestTemplate;
  rsvp: Rsvp;
  setRsvp: Function;
  milanBus: boolean;
  setMilanBus: Function;
  kids: Kids;
  setKids: Function;
};

const EnterGuestInfo = ({
  user,
  rsvp,
  setRsvp,
  milanBus,
  setMilanBus,
  kids,
  setKids,
}: Props) => {
  const [openKids, setOpenKids] = useState(false);
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
        <Input placeholder="first name" variant="filled" m={2} mb={3}></Input>
      </InputGroup>
      <InputGroup size="md">
        <Input placeholder="last name" variant="filled" m={2} mb={3}></Input>
      </InputGroup>
      <Heading size="md" mb={3}>
        rsvp
      </Heading>
      <InputGroup alignItems="center" justifyContent="center">
        <Stack spacing={5} direction="row" mb={3}>
          <Stack spacing={5} direction="column">
            {user.isInvitedToItaly && (
              <RsvpComponent
                rsvp={rsvp}
                setRsvp={setRsvp}
                openKids={openKids}
                setOpenKids={setOpenKids}
                setKids={setKids}
                location="italy"
                kids={kids}
              />
            )}
          </Stack>
          <Stack spacing={5} direction="column">
            {user.isInvitedToUSA && (
              <RsvpComponent
                rsvp={rsvp}
                setRsvp={setRsvp}
                openKids={openKids}
                setOpenKids={setOpenKids}
                setKids={setKids}
                location="usa"
                kids={kids}
              />
            )}
          </Stack>
        </Stack>
      </InputGroup>
      {user.isInvitedToItaly && rsvp.italy && (
        <>
          <Heading size="md" mb={3}>
            i want to ride the bus in milan
          </Heading>
          <Stack spacing={5} direction="column">
            <>
              <Button
                size="md"
                onClick={() => {
                  setMilanBus(true);
                }}
              >
                <Icon as={FaBus} />
              </Button>
              <Button
                size="md"
                onClick={() => {
                  setMilanBus(false);
                }}
              >
                <Icon as={FaCar} />
              </Button>
              {milanBus && <Text>i want to ride the party bus</Text>}
              {!milanBus && <Text>i will arrange my own travel</Text>}
            </>
          </Stack>
        </>
      )}
    </Flex>
  );
};

export default EnterGuestInfo;
