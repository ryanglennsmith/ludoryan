import { prismaTxnFactory } from "./prismaTxnFactory";

const prisma = prismaTxnFactory;

type filter = {
  isItalyFiltered?: boolean;
  isUSAFiltered?: boolean;
  isEmailAscending?: boolean;
  isNameAscending?: boolean;
};

export const getUsersByFilter = async (filter: filter) => {
  if (filter.isEmailAscending === true) {
    const prismaTxn = await prisma.guestTemplate.findMany({
      orderBy: {
        email: "asc",
      },
    });
    return prismaTxn;
  }
  if (filter.isEmailAscending === false) {
    const prismaTxn = await prisma.guestTemplate.findMany({
      orderBy: {
        email: "desc",
      },
    });

    return prismaTxn!;
  }
  if (filter.isNameAscending === true) {
    const prismaTxn = await prisma.guestTemplate.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return prismaTxn!;
  }
  if (filter.isNameAscending === false) {
    const prismaTxn = await prisma.guestTemplate.findMany({
      orderBy: {
        name: "desc",
      },
    });

    return prismaTxn!;
  }
  if (filter.isItalyFiltered === true && filter.isUSAFiltered === true) {
    const prismaTxn = await prisma.guestTemplate.findMany({
      where: {
        isInvitedToItaly: false,
        isInvitedToUSA: false,
      },
    });

    return prismaTxn!;
  }
  if (filter.isItalyFiltered === undefined && filter.isUSAFiltered === true) {
    const prismaTxn = await prisma.guestTemplate.findMany({
      where: {
        isInvitedToUSA: false,
      },
    });

    return prismaTxn!;
  }
  if (filter.isItalyFiltered === false && filter.isUSAFiltered === true) {
    const prismaTxn = await prisma.guestTemplate.findMany({
      where: {
        isInvitedToUSA: false,
      },
    });

    return prismaTxn!;
  }
  if (filter.isItalyFiltered === true && filter.isUSAFiltered === undefined) {
    const prismaTxn = await prisma.guestTemplate.findMany({
      where: {
        isInvitedToItaly: false,
      },
    });
    return prismaTxn;
  }
  if (filter.isItalyFiltered === true && filter.isUSAFiltered === false) {
    const prismaTxn = await prisma.guestTemplate.findMany({
      where: {
        isInvitedToItaly: false,
      },
    });

    return prismaTxn!;
  }
  if (
    (filter.isItalyFiltered === false ||
      filter.isItalyFiltered === undefined) &&
    (filter.isUSAFiltered === false || filter.isUSAFiltered === undefined)
  ) {
    const prismaTxn = await prisma.guestTemplate.findMany({});

    return prismaTxn!;
  }
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
