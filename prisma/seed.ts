import { PrismaClient } from "@prisma/client";
import fs from "fs";

const randomizeString = (length: Number) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
export type dummyTemplate = {
  password: string;
  name: string;
  email: string;
  plusOneName: string | null;
  isInvitedToItaly: boolean;
  isInvitedToUSA: boolean;
};

const dummyDataFileName: string = "utils/dummyData.json";
const dummyContent: string = fs.readFileSync(dummyDataFileName, "utf8");
const dummy = JSON.parse(dummyContent);

export const generateDummyData = (): dummyTemplate[] => {
  const dummyArr: dummyTemplate[] = [];
  dummy.forEach(
    (element: {
      name: string;
      email: string;
      plusOneName: string | null;
      isInvitedToItaly: boolean;
      isInvitedToUSA: boolean;
    }) => {
      dummyArr.push({
        name: element.name,
        email: element.email,
        plusOneName: element.plusOneName || null,
        isInvitedToItaly: element.isInvitedToItaly,
        isInvitedToUSA: element.isInvitedToUSA,
        password: randomizeString(8),
      });
    }
  );
  return dummyArr;
};

const prisma = new PrismaClient();
const db = generateDummyData();

const main = async () => {
  db.forEach(async (element: dummyTemplate) => {
    await prisma.guestTemplate.create({ data: element });
  });
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
