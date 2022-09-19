import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const userName = process.env.ADMIN_USERNAME || "";
const userEmail = process.env.ADMIN_EMAIL || "";
const password = process.env.ADMIN_PW;

export const hashedPass = async (unHashedPass: string) => {
  return bcrypt.hash(unHashedPass, 10).then((hash: string) => hash);
};

const prisma = new PrismaClient();

export const createAdmin = async () => {
  const hash = await hashedPass(password!);
  await prisma.admin.create({
    data: { name: userName, email: userEmail, password: hash },
  });
};

createAdmin()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
