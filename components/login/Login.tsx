import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";

type Props = {
  message: string;
  setMessage: Function;
  user: string;
  pw: string;
  setUser: Function;
  setPw: Function;
};
const isValidEntry = (text: string): boolean => text.length > 0;

const Login = ({ message, setMessage, user, pw, setUser, setPw }: Props) => {
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <Input
          placeholder="bob@bob.bob"
          variant="filled"
          mb={3}
          type="text"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        ></Input>
        <Input
          placeholder="************"
          variant="filled"
          mb={6}
          type="password"
          onChange={(e) => {
            setPw(e.target.value);
          }}
        ></Input>
        <Button type="submit" colorScheme="teal" mb={6}>
          log in
        </Button>
      </FormControl>
      <p>{message}</p>
    </form>
  );
};

export default Login;
