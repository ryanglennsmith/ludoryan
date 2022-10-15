import { GuestTemplate, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserById(id: string): Promise<GuestTemplate> {
  const prismaTxn = await prisma.guestTemplate.findUnique({
    where: {
      id: id,
    },
  });
  return prismaTxn!;
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
