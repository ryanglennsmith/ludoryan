import { GuestTemplate } from "@prisma/client";
import { prismaTxnFactory } from "./prismaTxnFactory";

const prisma = prismaTxnFactory;

export const getAllUsers = async (): Promise<GuestTemplate[]> => {
  const prismaTxn = await prisma.guestTemplate.findMany();
  return prismaTxn!;
};

export const closeTxn = async () => {
  try {
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};
