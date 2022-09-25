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
}: Props) => {
  const [isPlusOneOpen, setIsPlusOneOpen] = useState(false);

  return (
    <>
      <Heading m={3}>enter guest info</Heading>
      <Flex
        w="2xl"
        direction="column"
        alignItems="center"
        justifyContent="center"
        m={2}
      >
        <Input
          placeholder="name"
          defaultValue={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          variant="filled"
          m={2}
          mb={3}
        ></Input>
        <Input
          placeholder="email"
          defaultValue={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          variant="filled"
          m={2}
          mb={3}
          type="email"
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
        <Button m={2} mb={3} onClick={() => alert("do some validation first")}>
          save
        </Button>
      </Flex>
    </>
  );
};

export default EnterGuest;
