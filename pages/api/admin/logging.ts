import { NextApiRequest, NextApiResponse } from "next";
import { createLog, closeTxn } from "../../../services/dbTxn/createLog";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const log = await req.body;
  createLog(log);
  closeTxn();
  res.send(200);
}
