import React from "react";
import { Button } from "@chakra-ui/react";

const Logout = () => {
  const logout = async () => {};
  return (
    <Button onClick={logout} colorScheme="teal" mb={6}>
      Log out
    </Button>
  );
};

export default Logout;
