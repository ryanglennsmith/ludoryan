import React, { useState } from "react";
import {
  Button,
  Flex,
  Input,
  Heading,
  Checkbox,
  CheckboxGroup,
  Text,
  Stack,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import InvitedGuest from "../../types/InvitedGuest";
import generatePW from "../../services/encryption/pwGenerator";
type Props = {
  saveUser: Function;
  generatePW: Function;

  invitedGuest: InvitedGuest;
  setInvitedGuest: Function;
};
const firstGeneratedPW = generatePW(6);

const EnterGuest = ({
  saveUser,
  generatePW,
  invitedGuest,
  setInvitedGuest,
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
          <Heading m={3}>enter guest</Heading>
        </FormLabel>
        <InputGroup size="md">
          <Input
            placeholder="name"
            value={invitedGuest.name}
            onChange={(e) =>
              setInvitedGuest({ ...invitedGuest, name: e.target.value })
            }
            variant="filled"
            m={2}
            mb={3}
          ></Input>
        </InputGroup>
        {invitedGuest.name.length < 1 && <Text color="crimson">required</Text>}
        <InputGroup size="md">
          <Input
            placeholder="email"
            value={invitedGuest.email}
            onChange={(e) =>
              setInvitedGuest({ ...invitedGuest, email: e.target.value })
            }
            variant="filled"
            m={2}
            mb={3}
            type="email"
          ></Input>
        </InputGroup>
        {invitedGuest.email.length < 1 && <Text color="crimson">required</Text>}
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            placeholder="password"
            value={
              invitedGuest.password ? invitedGuest.password : firstGeneratedPW
            }
            onChange={(e) =>
              setInvitedGuest({ ...invitedGuest, password: e.target.value })
            }
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
                setInvitedGuest({ ...invitedGuest, password: generatePW(6) });
              }}
            >
              gen
            </Button>
          </InputRightElement>
        </InputGroup>
        {isPlusOneOpen && (
          <Input
            placeholder="plus one"
            defaultValue={invitedGuest.plusOne}
            onChange={(e) =>
              setInvitedGuest({ ...invitedGuest, plusOne: e.target.value })
            }
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
            setInvitedGuest({ ...invitedGuest, plusOne: undefined });
          }}
        >
          {!isPlusOneOpen ? "add a plus one" : "don't add a plus one"}
        </Button>
        <Text>which events to invite?</Text>
        <CheckboxGroup colorScheme="teal">
          <Stack spacing={[1, 5]} direction={"row"} m={2} mb={3}>
            <Checkbox
              checked={invitedGuest.italy}
              value="inviteToItaly"
              onChange={(e) =>
                setInvitedGuest({ ...invitedGuest, italy: e.target.checked })
              }
            >
              italy
            </Checkbox>
            <Checkbox
              checked={invitedGuest.usa}
              value="inviteToUSA"
              onChange={(e) =>
                setInvitedGuest({ ...invitedGuest, usa: e.target.checked })
              }
            >
              usa
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
