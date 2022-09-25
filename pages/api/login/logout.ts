import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironConfig";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();
  return res.json({ username: "", isLoggedIn: false });
};

export default withIronSessionApiRoute(handler, ironOptions);
