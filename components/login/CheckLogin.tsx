import React from "react";
import { Button } from "@chakra-ui/react";

const CheckLogin = () => {
  const checkLogin = async () => {};
  return (
    <Button onClick={checkLogin} colorScheme="red" mb={6}>
      Is your ass logged in?
    </Button>
  );
};

export default CheckLogin;
