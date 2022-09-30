import { NextApiRequest, NextApiResponse } from "next";
import {
  getUsersByFilter,
  closeTxn,
} from "../../../services/dbTxn/getUsersByFilter";

enum Filter {
  italy,
  notItaly,
  usa,
  notUsa,
  emailAsc,
  emailDesc,
  nameAsc,
  nameDesc,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filter = await req.body.filter.currentFilterState;
  console.log(req.body.filter);
  const foundUsers = await getUsersByFilter(filter);
  await closeTxn();
  return res.status(200).json({ createdUser: foundUsers });
}
