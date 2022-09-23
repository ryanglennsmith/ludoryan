import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironConfig";

import { isSamePass } from "../../../services/encryption/isSamePass";

import getUser from "../../../services/dbTxn/getUser";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUser(req.body.username);
  const isMatch: boolean = await isSamePass(req.body.password, user.password);
  if (user !== null && isMatch) {
    req.session.user = {
      username: req.body.username,
      isLoggedIn: true,
      isAdmin: false,
    };
    await req.session.save();
    res.status(200).json(req.session.user);
  } else {
    res.status(418).send("No coffee");
  }
}

export default withIronSessionApiRoute(handler, ironOptions);
