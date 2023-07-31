import { LoaderArgs, redirect } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";

export async function verifyUserLoader({ request }: LoaderArgs) {
  if (await getCurrentUser(request)) {
    return redirect("/");
  }
  return null;
}
