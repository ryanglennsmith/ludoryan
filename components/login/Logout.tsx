import { useRouter } from "next/router";
import { Button, Icon } from "@chakra-ui/react";
import { CgLogOut } from "react-icons/cg";
const Logout = () => {
  const router = useRouter();
  const logout = async () => {
    const response = await fetch("/api/login/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "test" }),
    }).then((response) => response.json());
    router.push("/");
  };
  return (
    <Button size="xs" onClick={logout} mb={6}>
      <Icon as={CgLogOut} />
    </Button>
  );
};

export default Logout;
