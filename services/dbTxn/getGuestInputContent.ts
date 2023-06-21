import { GuestInputContent } from "@prisma/client";
import { prismaTxnFactory } from "./prismaTxnFactory";

const prisma = prismaTxnFactory;
export const getGuestInputContent = async (): Promise<GuestInputContent[]> => {
  const prismaTxn = await prisma.guestInputContent.findMany();
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
