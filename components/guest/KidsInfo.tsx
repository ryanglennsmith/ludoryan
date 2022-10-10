import { Stack, Button, Icon, Input, Text } from "@chakra-ui/react";
import { FaChild, FaHandMiddleFinger } from "react-icons/fa";
import React from "react";
import IConfirmedGuest from "../../types/IConfirmedGuest";

type Props = {
  openKids: boolean;
  setOpenKids: Function;
  location: string;
  confirmedGuest: IConfirmedGuest;
  setConfirmedGuest: Function;
};
const KidsInfo = ({
  openKids,
  setOpenKids,
  location,
  confirmedGuest,
  setConfirmedGuest,
}: Props) => {
  type LocationObjectKey = keyof typeof confirmedGuest.italyKids;
  const confirmedLocationKids = (location + "kids") as LocationObjectKey;

  return (
    <>
      <Stack spacing={5} direction="column">
        <Text>...with my dumb kids?</Text>
        <Button onClick={() => setOpenKids(true)}>
          <Icon as={FaChild} />
        </Button>
        {openKids && (
          <>
            <Text>how many dumb kids:</Text>
            <Input
              placeholder="0"
              type="number"
              value={confirmedGuest[confirmedLocationKids]}
              onChange={(e) => {
                setConfirmedGuest({
                  ...confirmedGuest,
                  [confirmedLocationKids]: Number(e.target.value),
                });
              }}
            />
          </>
        )}
        <Text>...without my dumb kids</Text>
        <Button
          onClick={() => {
            setConfirmedGuest({
              ...confirmedGuest,

              [confirmedLocationKids]: 0,
            });
          }}
        >
          <Icon as={FaHandMiddleFinger} />
        </Button>
      </Stack>
    </>
  );
};

export default KidsInfo;
