import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import login from "../../services/login/login";
import { useEffect, useState } from "react";

type Props = {
  message: string;
  setMessage: Function;
  user: string;
  pw: string;
  setUser: Function;
  setPw: Function;
};

const Login = ({ message, setMessage, user, pw, setUser, setPw }: Props) => {
  const [doLogin, setDoLogin] = useState(false);
  useEffect(() => {
    if (doLogin) {
      login(setMessage, user, pw, router);
      setDoLogin(false);
    }
  }, [doLogin]);
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setDoLogin(true);
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
            setUser(e.target.value !== null ? e.target.value.trim().toLocaleLowerCase() : undefined);
            console.log(user)
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
