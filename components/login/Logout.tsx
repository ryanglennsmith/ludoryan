import React from "react";
import { Button } from "@chakra-ui/react";
type Props = { setMessage: Function };
const Logout = ({ setMessage }: Props) => {
  const logout = async () => {
    const response = await fetch("/api/login/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "test" }),
    }).then((response) => response.json());
    setMessage(String(response.isLoggedIn));
  };
  return (
    <Button onClick={logout} colorScheme="teal" mb={6}>
      Log out
    </Button>
  );
};

export default Logout;
