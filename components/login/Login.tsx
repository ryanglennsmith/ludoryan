import { Button } from "@chakra-ui/react";

type Props = {
  message: string;
  setMessage: Function;
  user: string;
  pw: string;
};
const isValidEntry = (text: string): boolean => text.length > 0;

const Login = ({ message, setMessage, user, pw }: Props) => {
  const login = async () => {
    if (isValidEntry(user) && isValidEntry(pw)) {
      const response = await fetch("/api/login/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pw }),
      }).then((response) => response.json());
      if (response.isLoggedIn) {
        setMessage("Logged in");
      } else {
        setMessage("Error logging in");
      }
    } else {
      setMessage("enter a username and password to log in");
    }
  };

  return (
    <>
      <Button onClick={login} colorScheme="teal" mb={6}>
        Log in
      </Button>
      <p>{message}</p>
    </>
  );
};

export default Login;
