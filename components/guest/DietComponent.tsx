import { Button, Heading, Input, InputGroup, Stack } from "@chakra-ui/react";
import { GuestTemplate } from "@prisma/client";
import React from "react";
import IConfirmedGuest from "../../types/IConfirmedGuest";
type Props = {
  user: GuestTemplate;
  openDiet: boolean;
  setOpenDiet: Function;
  openPlusDiet: boolean;
  setOpenPlusDiet: Function;
  confirmedGuest: IConfirmedGuest;
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
        {confirmedGuest.firstName} has dietary requirements
      </Heading>
      <Stack spacing={5} direction="row" mb={3}>
        <Button onClick={() => setOpenDiet(true)}>yes</Button>
        <Button
          onClick={() => {
            setOpenDiet(false);
            setConfirmedGuest({
              ...confirmedGuest,
              dietaryRestrictions: undefined,
            });
          }}
        >
          no
        </Button>
      </Stack>
      <InputGroup size="md">
        <Input
          disabled={openDiet ? false : true}
          placeholder={`${confirmedGuest.firstName} doesn't fucking eat...`}
          value={confirmedGuest.dietaryRestrictions || ""}
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
      {confirmedGuest.plusOneFirstName && (
        <>
          <Heading size="md" mb={3}>
            {confirmedGuest.plusOneFirstName} has dietary requirements
          </Heading>
          <Stack spacing={5} direction="row" mb={3}>
            <Button onClick={() => setOpenPlusDiet(true)}>yes</Button>
            <Button
              onClick={() => {
                setOpenPlusDiet(false);
                setConfirmedGuest({
                  ...confirmedGuest,
                  plusOneDietaryRestrictions: undefined,
                });
              }}
            >
              no
            </Button>
          </Stack>
          <InputGroup size="md">
            <Input
              placeholder={`${confirmedGuest.plusOneFirstName} doesn't fucking eat...`}
              value={confirmedGuest.plusOneDietaryRestrictions}
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
