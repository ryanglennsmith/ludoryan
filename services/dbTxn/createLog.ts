import ILogger from "../../types/ILogger";
import { prismaTxnFactory } from "./prismaTxnFactory";

const prisma = prismaTxnFactory;
export async function createLog(log: ILogger) {
  const prismaTxn = await prisma.logDb.create({
    data: {
      eventMessage: log.event,
      successMessage: log.successMessage || null,
      errorMessage: JSON.stringify(log.errorMessage) || null,
      templateId: log.userId || null,
    },
  });
  return prismaTxn;
}
export async function closeTxn() {
  try {
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}
