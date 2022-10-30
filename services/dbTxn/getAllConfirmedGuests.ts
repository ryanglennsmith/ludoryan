import { PrismaClient, ConfirmedGuest } from "@prisma/client";
const prisma = new PrismaClient();
export const getAllConfirmedGuests = async (): Promise<ConfirmedGuest[]> => {
  const prismaTxn = await prisma.confirmedGuest.findMany();
  return prismaTxn;
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
