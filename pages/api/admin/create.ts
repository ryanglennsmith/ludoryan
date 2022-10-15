import { NextApiRequest, NextApiResponse } from "next";
import { createUser, closeTxn } from "../../../services/dbTxn/createUser";
import { getUser } from "../../../services/dbTxn/getUser";
import { updateUser } from "../../../services/dbTxn/updateUser";
import { hashedPass } from "../../../services/encryption/hashPW";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await req.body.user;
  if (!user) {
    return res.status(200).json(req.body);
  }
  user.password = await hashedPass(user.password);
  if (req.body.user.editingMode) {
    const createdUser = await updateUser(user);
    const checkUser = await getUser(user.email);
    await closeTxn();
    return res.status(200).json({ createdUser: checkUser });
  } else {
    const createdUser = await createUser(user);
    if (createdUser?.email === "exists") {
      return res
        .status(200)
        .json({ createdUser: { name: "user", email: "exists" } });
    } else {
      const checkUser = await getUser(user.email);
      await closeTxn();
      return res.status(200).json({ createdUser: checkUser });
    }
  }
}
