import React, { useState } from "react";
import {
  Button,
  Flex,
  Input,
  Box,
  Heading,
  Checkbox,
  CheckboxGroup,
  Text,
  Stack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

type Props = {
  isInvitedToItaly: boolean;
  setIsInvitedToItaly: Function;
  isInvitedToUSA: boolean;
  setIsInvitedToUSA: Function;
  guestName: string;
  setGuestName: Function;
  guestEmail: string;
  setGuestEmail: Function;
  plusOne: string;
  setPlusOne: Function;
  password: string;
  setPassword: Function;
  saveUser: Function;
};

const EnterGuest = ({
  isInvitedToItaly,
  setIsInvitedToItaly,
  isInvitedToUSA,
  setIsInvitedToUSA,
  guestName,
  setGuestName,
  guestEmail,
  setGuestEmail,
  plusOne,
  setPlusOne,
  password,
  setPassword,
  saveUser,
}: Props) => {
  const [isPlusOneOpen, setIsPlusOneOpen] = useState(false);

  return (
    <>
      <Flex
        w="2xl"
        direction="column"
        alignItems="center"
        justifyContent="center"
        m={2}
      >
        <FormLabel>
          <Heading m={3}>enter guest info</Heading>
        </FormLabel>
        <Input
          placeholder="name"
          defaultValue={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          variant="filled"
          m={2}
          mb={3}
        ></Input>
        {guestName.length < 1 && <Text color="crimson">required</Text>}

        <Input
          placeholder="email"
          defaultValue={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          variant="filled"
          m={2}
          mb={3}
          type="email"
        ></Input>
        {guestEmail.length < 1 && <Text color="crimson">required</Text>}
        <Input
          placeholder="password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
          m={2}
          mb={3}
        ></Input>
        {isPlusOneOpen && (
          <Input
            placeholder="plus one"
            defaultValue={plusOne}
            onChange={(e) => setPlusOne(e.target.value)}
            variant="filled"
            m={2}
            mb={3}
          ></Input>
        )}
        <Button
          m={2}
          mb={3}
          onClick={() => {
            setIsPlusOneOpen(!isPlusOneOpen);
            setPlusOne("");
          }}
        >
          {!isPlusOneOpen ? "add a plus one" : "don't add a plus one"}
        </Button>
        <Text>which events to invite?</Text>
        <CheckboxGroup colorScheme="teal">
          <Stack spacing={[1, 5]} direction={"row"} m={2} mb={3}>
            <Checkbox
              value="inviteToItaly"
              onChange={() => setIsInvitedToItaly(!isInvitedToItaly)}
              checked={isInvitedToItaly}
            >
              Italy
            </Checkbox>
            <Checkbox
              value="inviteToUSA"
              onChange={() => setIsInvitedToUSA(!isInvitedToUSA)}
              checked={isInvitedToUSA}
            >
              USA
            </Checkbox>
          </Stack>
        </CheckboxGroup>
        <Button m={2} mb={3} onClick={() => saveUser(true)}>
          save
        </Button>
      </Flex>
    </>
  );
};

export default EnterGuest;
