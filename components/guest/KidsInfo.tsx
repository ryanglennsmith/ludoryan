import { Stack, Button, Icon, Input, Text } from "@chakra-ui/react";
import { FaChild, FaHandMiddleFinger } from "react-icons/fa";
import React from "react";
import type Kids from "../../types/Kids";

type Props = {
  openKids: boolean;
  setOpenKids: Function;
  setKids: Function;
  location: string;
  kids: Kids;
};
const KidsInfo = ({
  openKids,
  setOpenKids,
  setKids,
  location,
  kids,
}: Props) => {
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
              type="number"
              onChange={(e) => {
                if (location === "italy") {
                  setKids({
                    ...kids,
                    italy: Number(e.target.value),
                  });
                }
                if (location === "usa") {
                  setKids({
                    ...kids,
                    usa: Number(e.target.value),
                  });
                }
              }}
            />
          </>
        )}
        <Button
          onClick={() => {
            setOpenKids(false);
            if (location === "italy") {
              setKids({
                ...kids,
                italy: 0,
              });
            }
            if (location === "usa") {
              setKids({
                ...kids,
                usa: 0,
              });
            }
          }}
        >
          <Icon as={FaHandMiddleFinger} />
        </Button>
      </Stack>
    </div>
  );
};

export default KidsInfo;
