import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const isSamePass = async (unHashedPass: string, hashedPass: string) => {
  return bcrypt
    .compare(unHashedPass, hashedPass)
    .then((result: boolean) => result);
};

const prisma = new PrismaClient();

export const checkPW = async () => {
  const db = await prisma.guestTemplate.findUnique({
    where: {
      id: "0f887885-3fd9-4d9a-b54a-a90e0f420d57",
    },
  });
  const valid: boolean = await isSamePass("rZ53Gwrx", db!.password);
  console.log(valid);
};

checkPW()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
