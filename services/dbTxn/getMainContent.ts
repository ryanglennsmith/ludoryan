import { MainContent } from "@prisma/client";
import { prismaTxnFactory } from "./prismaTxnFactory";

const prisma = prismaTxnFactory;
export const getMainContent = async (): Promise<MainContent[]> => {
  const prismaTxn = await prisma.mainContent.findMany();
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
