import { GuestTemplate, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getUser(
  username: string
): Promise<GuestTemplate> {
  const prismaTxn = await prisma.guestTemplate.findUnique({
    where: {
      email: username,
    },
  });
  return prismaTxn!;
}
