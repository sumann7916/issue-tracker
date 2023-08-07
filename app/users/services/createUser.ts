import { db } from "~/utils/db.server";
import { AddUserDto } from "../types/addUser.type";
import { hashPassword } from "~/utils/login.utils";

export const createUser = async ({
  confirm_password,
  password,
  ...data
}: AddUserDto) => {
  const hashedPassword = await hashPassword(password);
  await db.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

export const checkIfUsernameExists = async (username: string) => {
  return (
    (await db.user.findUnique({
      where: { username },
      select: { id: true },
    })) !== null
  );
};
