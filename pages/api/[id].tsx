import { NextApiRequest, NextApiResponse } from "next";
import { getUserById, closeTxn } from "../../services/dbTxn/getUserById";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const uuid = req.query.id;
  const user = await getUserById(uuid!.toString());
  await closeTxn();
  res.status(200).json(user);
};

export default handler;
