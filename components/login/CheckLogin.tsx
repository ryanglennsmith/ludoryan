import React from "react";
import { Button } from "@chakra-ui/react";
type Props = { setIsLoggedIn: Function };
const CheckLogin = ({ setIsLoggedIn }: Props) => {
  const checkLogin = async () => {
    const response = await fetch("/api/login/check", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    console.log(response);
    setIsLoggedIn(String(response.isLoggedIn));
  };
  return (
    <Button onClick={checkLogin} colorScheme="red" mb={6}>
      is your ass logged in?
    </Button>
  );
};

export default CheckLogin;
