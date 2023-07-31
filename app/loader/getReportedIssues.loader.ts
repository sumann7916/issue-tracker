import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { getIssues } from "~/issue/services/getIssues";

export async function getReportedIssuesLoader({ request }: LoaderArgs) {
  const user = await getCurrentUser(request);
  if (!user || user.user_type !== UserType.USER) {
    return redirect("/login");
  }
  return await getIssues(user.id, false);
}
