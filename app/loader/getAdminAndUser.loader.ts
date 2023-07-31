import { LoaderArgs, redirect } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { getAdminAndUser } from "~/users/services/getAllUser";

export async function getAdminAndUserLoader({ request }: LoaderArgs) {
  const user = getCurrentUser(request);
  if (!user) {
    return redirect("/login");
  }
  return await getAdminAndUser();
}
