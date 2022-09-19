import { Button } from "@chakra-ui/react";

type Props = { message: string; setMessage: Function };

const Login = ({ message, setMessage }: Props) => {
  const login = async () => {
    const response = await fetch("/api/login/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "ryan", password: "1234" }),
    }).then((response) => response.json());
    if (response.isLoggedIn) {
      setMessage("Logged in");
    } else {
      setMessage("Error");
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
