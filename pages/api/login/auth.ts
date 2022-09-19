import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironConfig";

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    req.session.user = {
      username: "ryan",
      isLoggedIn: true,
    };
    await req.session.save();
    res.json({ ok: true });
  },
  {
    cookieName: "CookieMonster",
    password: "1234",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);

// export async function loginRoute(
//   req: NextApiRequest,
//   res: NextApiResponse<User>
// ) {
//   const { username, password } = await req.body;
//   const sessionUser = { username: username, isLoggedIn: true } as User;
//   req.session.user = sessionUser;

//   await req.session.save();

//   return res.json(sessionUser);
// }
