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
  InputGroup,
  InputRightElement,
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
  generatePW: Function;
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
  generatePW,
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
        <InputGroup size="md">
          <Input
            placeholder="name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            variant="filled"
            m={2}
            mb={3}
          ></Input>
        </InputGroup>
        {guestName.length < 1 && <Text color="crimson">required</Text>}
        <InputGroup size="md">
          <Input
            placeholder="email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            variant="filled"
            m={2}
            mb={3}
            type="email"
          ></Input>
        </InputGroup>
        {guestEmail.length < 1 && <Text color="crimson">required</Text>}
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            m={2}
            mb={3}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              mt="1rem"
              mr="1rem"
              onClick={() => {
                setPassword(generatePW(6));
              }}
            >
              gen
            </Button>
          </InputRightElement>
        </InputGroup>
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
