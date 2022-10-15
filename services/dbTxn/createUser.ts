import { GuestTemplate, PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
export async function createUser(user: GuestTemplate) {
  try {
    const prismaTxn = await prisma.guestTemplate.create({
      data: {
        name: user.name,
        password: user.password,
        email: user.email,
        plusOneName: user.plusOneName,
        isInvitedToItaly: user.isInvitedToItaly,
        isInvitedToUSA: user.isInvitedToUSA,
      },
    });

    return prismaTxn!;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { email: "exists" };
      }
    }
  }
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
