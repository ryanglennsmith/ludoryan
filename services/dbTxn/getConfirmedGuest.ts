import { ConfirmedGuest } from "@prisma/client";
import { prismaTxnFactory } from "./prismaTxnFactory";

const prisma = prismaTxnFactory;
export const getConfirmedGuest = async (
  guestId: string
): Promise<ConfirmedGuest> => {
  const prismaTxn = await prisma.confirmedGuest.findUnique({
    where: { templateId: guestId },
  });
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
