import { Stack, Button, Icon, Input, Text } from "@chakra-ui/react";
import { FaChild, FaHandMiddleFinger } from "react-icons/fa";
import React from "react";
import type Kids from "../../types/Kids";
import ConfirmedGuest from "../../types/ConfirmedGuest";

type Props = {
  openKids: boolean;
  setOpenKids: Function;
  location: string;
  confirmedGuest: ConfirmedGuest;
  setConfirmedGuest: Function;
};
const KidsInfo = ({
  openKids,
  setOpenKids,
  location,
  confirmedGuest,
  setConfirmedGuest,
}: Props) => {
  type ObjectKey = keyof typeof confirmedGuest;
  const confirmedLocation = location as ObjectKey;
  return (
    <div>
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
              onChange={(e) => {
                setConfirmedGuest({
                  ...confirmedGuest,
                  location: {
                    [confirmedLocation]: { kids: Number(e.target.value) },
                  },
                });
              }}
            />
          </>
        )}
        <Button
          onClick={() => {
            setOpenKids(false);
            setConfirmedGuest({
              ...confirmedGuest,
              location: {
                [confirmedLocation]: { kids: 0 },
              },
            });
          }}
        >
          <Icon as={FaHandMiddleFinger} />
        </Button>
      </Stack>
    </div>
  );
};

export default KidsInfo;
