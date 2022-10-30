import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironConfig";

import { isSamePass } from "../../../services/encryption/isSamePass";

import { getUser, closeTxn } from "../../../services/dbTxn/getUser";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (
    req.body.username === process.env.ADMIN_USERNAME &&
    req.body.password === process.env.ADMIN_PW
  ) {
    req.session.user = {
      username: process.env.ADMIN_DISPLAY_NAME!,
      isLoggedIn: true,
      isAdmin: true,
      id: "0",
      language: 0,
    };
    await req.session.save();
    return res.status(200).json(req.session.user);
  } else {
    const user = await getUser(req.body.username);
    await closeTxn();
    if (user) {
      const isMatch: boolean = await isSamePass(
        req.body.password,
        user.password
      );
      if (user && isMatch) {
        req.session.user = {
          username: req.body.username,
          isLoggedIn: true,
          isAdmin: false,
          id: user.id,
          language: 0,
        };
        await req.session.save();
        return res.status(200).json(req.session.user);
      }
    } else {
      res.status(418).json({ status: "no coffee" });
    }
  }
}

export default withIronSessionApiRoute(handler, ironOptions);
