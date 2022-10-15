import { NextApiRequest, NextApiResponse } from "next";
import {
  upsertConfirmedGuest,
  closeTxn,
} from "../../../services/dbTxn/upsertConfirmedGuest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await req.body.confirmedGuest;
  await upsertConfirmedGuest(data);
  await closeTxn();
  return res.status(200).json({ upsert: data });
}
