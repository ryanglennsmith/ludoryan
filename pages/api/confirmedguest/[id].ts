import { NextApiRequest, NextApiResponse } from "next";
import {
  getConfirmedGuest,
  closeTxn,
} from "../../../services/dbTxn/getConfirmedGuest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: any = req.query.id;
  const response = await getConfirmedGuest(id);
  // if (response === null) {
  //   await closeTxn();
  //   return res.status(200).json({ user: undefined });
  // }
  await closeTxn();
  return res.status(200).json(response);
}
