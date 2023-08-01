import { db } from "~/utils/db.server";
import { AddUserDto } from "../types/user.types";

export const createUser = async ({ confirm_password, ...data }: AddUserDto) => {
  await db.user.create({ data });
};

export const checkIfUsernameExists = async (username: string) => {
  return (
    (await db.user.findUnique({
      where: { username },
      select: { id: true },
    })) !== null
  );
};
