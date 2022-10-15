import bcrypt from "bcrypt";

export const hashedPass = async (unHashedPass: string) => {
  return bcrypt.hash(unHashedPass, 10).then((hash: string) => hash);
};
