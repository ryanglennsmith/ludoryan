import { NextApiRequest, NextApiResponse } from "next";
import { getGuestInputContent } from "../../../services/dbTxn/getGuestInputContent";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getGuestInputContent();
  return res.status(200).json(response);
}
