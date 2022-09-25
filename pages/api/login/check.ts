import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironConfig";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.session.user;
  if (!user || !user.isLoggedIn) {
    return res.status(200).json({ username: "", isLoggedIn: false });
  } else {
    return res.status(200).json({ username: user.username, isLoggedIn: true });
  }
};
export default withIronSessionApiRoute(handler, ironOptions);
