import { Button, Heading, Input, InputGroup, Stack } from "@chakra-ui/react";
import { GuestTemplate } from "@prisma/client";
import React from "react";
import ConfirmedGuest from "../../types/ConfirmedGuest";
type Props = {
  user: GuestTemplate;
  openDiet: boolean;
  setOpenDiet: Function;
  openPlusDiet: boolean;
  setOpenPlusDiet: Function;
  confirmedGuest: ConfirmedGuest;
  setConfirmedGuest: Function;
};
const DietComponent = ({
  user,
  openDiet,
  setOpenDiet,
  openPlusDiet,
  setOpenPlusDiet,
  confirmedGuest,
  setConfirmedGuest,
}: Props) => {
  return (
    <>
      <Heading size="md" mb={3}>
        {user.name} has dietary requirements
      </Heading>
      <Stack spacing={5} direction="row" mb={3}>
        <Button onClick={() => setOpenDiet(true)}>yes</Button>
        <Button onClick={() => setOpenDiet(false)}>no</Button>
      </Stack>
      <InputGroup size="md">
        <Input
          disabled={openDiet ? false : true}
          placeholder={`${user.name} doesn't fucking eat...`}
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
      </InputGroup>
      {user.plusOneName && (
        <>
          <Heading size="md" mb={3}>
            {user.plusOneName} has dietary requirements
          </Heading>
          <Stack spacing={5} direction="row" mb={3}>
            <Button onClick={() => setOpenPlusDiet(true)}>yes</Button>
            <Button onClick={() => setOpenPlusDiet(false)}>no</Button>
          </Stack>
          <InputGroup size="md">
            <Input
              placeholder={`${user.plusOneName} doesn't fucking eat...`}
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
