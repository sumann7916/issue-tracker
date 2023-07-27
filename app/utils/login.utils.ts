import * as argon2 from "argon2";
import { SignInputType } from "~/types/signIn.type";
import { db } from "./db.server";

export const hashPassword = async (passwordString: string) => {
  return await argon2.hash(passwordString);
};

export const validateUserAndGetUserId = async ({
  username,
  password,
  user_type,
}: SignInputType) => {
  const user = await db.user.findFirst({
    where: {
      username,
      user_type,
    },
    select: {
      id: true,
      username: true,
      password: true,
    },
  });
  if (user && (await argon2.verify(user.password, password))) {
    return {
      id: user.id,
      user_type,
    };
  }
};
