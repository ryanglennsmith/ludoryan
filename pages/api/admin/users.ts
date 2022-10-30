import { NextApiRequest, NextApiResponse } from "next";
import {
  getUsersByFilter,
  closeTxn,
} from "../../../services/dbTxn/getUsersByFilter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filter = await req.body.filter.currentFilterState;
  const foundUsers = await getUsersByFilter(filter);
  await closeTxn();
  return res.status(200).json({ createdUser: foundUsers });
}
