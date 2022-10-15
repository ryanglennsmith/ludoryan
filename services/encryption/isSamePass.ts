import bcrypt from "bcrypt";

export const isSamePass = async (unHashedPass: string, hashedPass: string) => {
  return bcrypt
    .compare(unHashedPass, hashedPass)
    .then((result: boolean) => result);
};
