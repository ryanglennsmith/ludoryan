import { PrismaClient } from "@prisma/client";

export interface IPrismaTxnFactory {
  createLog: Function;
  createUser: Function;
  getAllConfirmedGuests: Function;
  getAllUsers: Function;
  getConfirmedGuest: Function;
  getUser: Function;
  getUserById: Function;
  getUsersByFilter: Function;
  updateUser: Function;
  upsertConfirmedGuest: Function;
  prisma: PrismaClient;
}
