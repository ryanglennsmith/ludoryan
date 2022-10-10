import { InputGroup, Input } from "@chakra-ui/react";
import React from "react";
import IConfirmedGuest from "../../types/IConfirmedGuest";

type Props = {
  valueToSet: string;
  confirmedGuest: IConfirmedGuest;
  placeHolder: string;
  setConfirmedGuest: Function;
};

const GuestInfoInputComponent = ({
  valueToSet,
  placeHolder,
  setConfirmedGuest,
  confirmedGuest,
}: Props) => {
  return (
    <>
      <InputGroup size="md">
        <Input
          placeholder={placeHolder}
          variant="filled"
          m={2}
          mb={3}
          onChange={(e) =>
            setConfirmedGuest({
              ...confirmedGuest,
              [valueToSet]: e.target.value,
            })
          }
        />
      </InputGroup>
    </>
  );
};

export default GuestInfoInputComponent;
