import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  message: string;
  setMessage: Function;
  user: string;
  pw: string;
};
const isValidEntry = (text: string): boolean => text.length > 0;

const Login = ({ message, setMessage, user, pw }: Props) => {
  const router = useRouter();
  const login = async () => {
    if (isValidEntry(user) && isValidEntry(pw)) {
      const response = await fetch("/api/login/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pw }),
      }).then((response) => response.json());
      if (response.isLoggedIn) {
        setMessage(response.id);
        if (response.id === "0") {
          router.push("/admin");
        } else {
          router.push(`/${response.id}`);
        }
      } else {
        setMessage("error logging in");
      }
    } else {
      setMessage("enter a username and password to log in");
    }
  };

  return (
    <>
      <Button
        onClick={login}
        // onKeyDown={(e) => {
        //   console.log(e.key);
        //   if (e.key === "Enter") {
        //     // console.log(e.key)
        //     // login;
        //   }
        // }}
        colorScheme="teal"
        mb={6}
      >
        log in
      </Button>
      <p>{message}</p>
    </>
  );
};

export default Login;
