// script to run once to seed db with content
// import guestInputContent from "../resource/guestInputContent.js";
// import mainContent from "../resource/mainContent.js";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// async function main() {
//   for (const [key, value] of Object.entries(mainContent)) {
//     await prisma.mainContent.create({
//       data: {
//         title: key,
//         content: value,
//       },
//     });
//   }
//   for (const [key, value] of Object.entries(guestInputContent)) {
//     await prisma.guestInputContent.create({
//       data: {
//         title: key,
//         content: value,
//       },
//     });
//   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
