import { db } from "./db.server";
import { SignInputType } from "~/users/types/signIn.type";
import * as bcrypt from "bcryptjs";

export const hashPassword = async (passwordString: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(passwordString, salt);
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
  if (user && (await bcrypt.compare(password, user.password))) {
    return {
      id: user.id,
      user_type,
    };
  }
};
