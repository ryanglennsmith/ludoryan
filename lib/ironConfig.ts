export const ironOptions = {
  cookieName: "session_lr",
  password: String(process.env.PUBLIC_COOKIE_KEY),
  cookieOptions: {
    maxAge: undefined,
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
  isAdmin: boolean;
  id: string;
  language: number;
};
