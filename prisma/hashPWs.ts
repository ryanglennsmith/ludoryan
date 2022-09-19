import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const hashedPass = async (unHashedPass: string) => {
  return bcrypt.hash(unHashedPass, 10).then((hash: string) => hash);
};

const prisma = new PrismaClient();
export const hashPWs = async () => {
  const db = await prisma.guestTemplate.findMany();
  db.forEach(async (element) => {
    const hash = await hashedPass(element.password);
    await prisma.guestTemplate.update({
      where: { id: element.id },
      data: { password: hash },
    });
  });
};

hashPWs()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
