import { db } from "~/utils/db.server";

export const getAllUser = async () => {
  return await db.user.findMany({
    select: {
      full_name: true,
      username: true,
      user_type: true,
    },
  });
};
