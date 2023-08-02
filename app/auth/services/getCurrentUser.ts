import { UserType } from "@prisma/client";
import { redirect } from "@remix-run/node";
import { findOneUser } from "~/users/services/getAllUser";
import { SelectUserOptions, WhereUserOptions } from "~/users/types/user.types";
import { getSession } from "~/utils/createSession";

export const getUserSession = async (request: Request) => {
  return await getSession(request.headers.get("Cookie"));
};

export const getCurrentUser = async (request: Request) => {
  const session = await getUserSession(request);
  const id = session.get("userId");
  const user_type = session.get("user_type") as UserType;
  if (!id || !user_type) {
    return null;
  }
  const user = await verifiedUser(id, user_type);
  if (!user) {
    return null;
  }
  //Connect user to event source
  redirect(`issue/subscribe/${user.id}`);
  return user;
};

export const verifiedUser = async (id: string, user_type: UserType) => {
  const where: WhereUserOptions = { id, user_type };
  const select: SelectUserOptions = {
    id: true,
    user_type: true,
    username: true,
  };
  return await findOneUser(where, select);
};
