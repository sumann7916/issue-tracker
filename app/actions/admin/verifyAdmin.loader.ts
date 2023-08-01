import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";

export const verifyAdminLoader = async ({ request }: LoaderArgs) => {
  const user = await getCurrentUser(request);
  if (!user || user.user_type !== UserType.ADMIN) {
    return redirect("/login");
  }
  return null;
};
