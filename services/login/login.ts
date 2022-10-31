import { NextRouter } from "next/router";
import sendLog from "../logging/loginLog";

const isValidEntry = (text: string): boolean => text.length > 0;
const login = async (
  setMessage: Function,
  user: string,
  pw: string,
  router: NextRouter
) => {
  if (isValidEntry(user) && isValidEntry(pw)) {
    try {
      const response = await fetch("/api/login/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pw }),
      });
      const result = await response.json();
      if (result.isLoggedIn) {
        // TODO REMOVE DEV ENV ADMIN ID STUFF HERE
        let userId;
        if (result.id === "0") {
          userId = process.env.ADMIN_ID;
        } else {
          userId = result.id;
        }
        sendLog({
          event: `successful login`,
          successMessage: `${user} logged in`,
          userId: userId,
        });
        setMessage(result.id);
        if (result.id === "0") {
          router.push("/admin");
        } else {
          router.push(`/${result.id}`);
        }
      } else {
        sendLog({
          event: `unsuccessful login`,
          errorMessage: `failed attempt for user ${user} password ${pw}, no exception message`,
        });
        setMessage("error logging in");
      }
    } catch (e: any) {
      sendLog({
        event: `unsuccessful login attempt for user ${user} password ${pw}`,
        errorMessage: e,
      });
    }
  } else {
    setMessage("enter a username and password to log in");
  }
};
export default login;
