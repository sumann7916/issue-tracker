import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { getIssues } from "~/issue/services/getIssues";

export async function getReportedIssuesLoader({ request }: LoaderArgs) {
  const user = await getCurrentUser(request);
  return user?.user_type !== UserType.USER
    ? redirect("/login")
    : await getIssues(user.id, false);
}
