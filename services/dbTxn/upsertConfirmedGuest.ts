import IConfirmedGuest from "../../types/IConfirmedGuest";
import { prismaTxnFactory } from "./prismaTxnFactory";

const prisma = prismaTxnFactory;
export async function upsertConfirmedGuest(guest: IConfirmedGuest) {
  try {
    const prismaTxn = await prisma.confirmedGuest.upsert({
      where: { templateId: guest.id },
      update: {
        firstName: guest.firstName,
        lastName: guest.lastName || null,
        plusOneFirstName: guest.plusOneFirstName || null,
        plusOneLastName: guest.plusOneLastName || null,
        confirmedItaly: guest.confirmedItaly || null,
        confirmedUsa: guest.confirmedUsa || null,
        italyKids: guest.italyKids || null,
        italyBus: guest.italyBus || null,
        italyPlusOne: guest.italyPlusOne || null,
        usaKids: guest.usaKids || null,
        usaPlusOne: guest.usaPlusOne || null,
        plusOneDietaryRestrictions: guest.plusOneDietaryRestrictions || null,
        dietaryRestrictions: guest.dietaryRestrictions || null,
        additionalInformation: guest.additionalInformation || null,
      },
      create: {
        templateId: guest.id,
        firstName: guest.firstName,
        lastName: guest.lastName || null,
        plusOneFirstName: guest.plusOneFirstName || null,
        plusOneLastName: guest.plusOneLastName || null,
        confirmedItaly: guest.confirmedItaly || null,
        confirmedUsa: guest.confirmedUsa || null,
        italyKids: guest.italyKids || null,
        italyBus: guest.italyBus || null,
        italyPlusOne: guest.italyPlusOne || null,
        usaKids: guest.usaKids || null,
        usaPlusOne: guest.usaPlusOne || null,
        plusOneDietaryRestrictions: guest.plusOneDietaryRestrictions || null,
        dietaryRestrictions: guest.dietaryRestrictions || null,
        additionalInformation: guest.additionalInformation || null,
      },
    });
    return prismaTxn!;
  } catch (e) {
    console.error(e);
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
