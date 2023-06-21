import { NextApiRequest, NextApiResponse } from "next";
import { getMainContent } from "../../../services/dbTxn/getMainContent";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getMainContent();
  return res.status(200).json(response);
}
