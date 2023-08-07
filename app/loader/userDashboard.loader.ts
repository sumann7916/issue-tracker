import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { getAllUserName } from "~/users/services/getAllUser";

export async function userDashboardloader({ request }: LoaderArgs) {
  const user = await getCurrentUser(request);

  return user?.user_type !== UserType.USER
    ? redirect("/login")
    : {
        users: await getAllUserName(),
        userId: user.id,
      };
}
