import {
  Flex,
  FormLabel,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  CheckboxGroup,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";
type Props = {
  setEditGuestField: Function;
  setIsClickedEdit: Function;
};
const EditGuest = ({ setEditGuestField, setIsClickedEdit }: Props) => {
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
          <Heading m={3}>enter guest email to edit</Heading>
        </FormLabel>
        <InputGroup size="md">
          <Input
            placeholder="email"
            onChange={(e) => setEditGuestField(e.target.value)}
            variant="filled"
            m={2}
            mb={3}
          ></Input>
        </InputGroup>

        <Button m={2} mb={3} onClick={() => setIsClickedEdit(true)}>
          lookup
        </Button>
      </Flex>
    </>
  );
};

export default EditGuest;
