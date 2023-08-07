import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { getAdminAndUser } from "~/users/services/getAllUser";

export async function getAdminAndUserLoader({ request }: LoaderArgs) {
  const user = await getCurrentUser(request);
  if (user?.user_type !== UserType.ADMIN) {
    return redirect("/login");
  }
  return await getAdminAndUser();
}
