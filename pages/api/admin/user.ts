import { NextApiRequest, NextApiResponse } from "next";
import { getUser, closeTxn } from "../../../services/dbTxn/getUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await req.body.email;
  const foundUser = await getUser(user);
  await closeTxn();
  return res.status(200).json({ createdUser: foundUser });
}
