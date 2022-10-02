import { Icon, Button, Text } from "@chakra-ui/react";
import React from "react";
import KidsInfo from "./KidsInfo";
import type Rsvp from "../../types/Rsvp";
import type Kids from "../../types/Kids";
import { FaPizzaSlice, FaGuitar } from "react-icons/fa";
type Props = {
  rsvp: Rsvp;
  setRsvp: Function;
  openKids: boolean;
  setOpenKids: Function;
  setKids: Function;
  location: string;
  kids: Kids;
};

const RsvpComponent = ({
  rsvp,
  setRsvp,
  openKids,
  setOpenKids,
  setKids,
  location,
  kids,
}: Props) => {
  return (
    <>
      {location === "italy" && <Icon as={FaPizzaSlice} alignSelf="center" />}
      {location === "usa" && <Icon as={FaGuitar} alignSelf="center" />}
      {location === "italy" && (
        <>
          <Button onClick={() => setRsvp({ ...rsvp, italy: true })}>yes</Button>
          <Button
            onClick={() => {
              setRsvp({ ...rsvp, italy: false });
              setKids({ ...kids, italy: 0 });
            }}
          >
            no
          </Button>
        </>
      )}
      {location === "usa" && (
        <>
          <Button onClick={() => setRsvp({ ...rsvp, usa: true })}>yes</Button>
          <Button
            onClick={() => {
              setRsvp({ ...rsvp, usa: false });
              setKids({ ...kids, usa: 0 });
            }}
          >
            no
          </Button>
        </>
      )}
      {location === "italy" && (
        <>
          <Text>
            i will{" "}
            {!rsvp.italy && (
              <Text as="span" color="crimson">
                not
              </Text>
            )}{" "}
            attend
          </Text>
          {rsvp.italy && (
            <KidsInfo
              openKids={openKids}
              setOpenKids={setOpenKids}
              setKids={setKids}
              location={location}
              kids={kids}
            ></KidsInfo>
          )}
        </>
      )}
      {location === "usa" && (
        <>
          <Text>
            i will{" "}
            {!rsvp.usa && (
              <Text as="span" color="crimson">
                not
              </Text>
            )}{" "}
            attend
          </Text>
          {rsvp.usa && (
            <KidsInfo
              openKids={openKids}
              setOpenKids={setOpenKids}
              setKids={setKids}
              location={location}
              kids={kids}
            ></KidsInfo>
          )}
        </>
      )}
    </>
  );
};

export default RsvpComponent;
