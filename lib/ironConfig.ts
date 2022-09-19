import * as IronSession from "iron-session";
export const ironOptions = {
  cookieName: "CookieMonster",
  password: String(process.env.PUBLIC_COOKIE_KEY),
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
type User = {
  username: string;
  isLoggedIn: boolean;
};
