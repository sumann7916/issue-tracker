import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { findOneIssue, getIssueHistory } from "~/issue/services/getIssues";

export async function getIssueDetailsLoader({ request, params }: LoaderArgs) {
  const user = await getCurrentUser(request);
  return user?.user_type !== UserType.USER
    ? redirect("/login")
    : {
        issue: await findOneIssue(user.id, params.id),
        issueHistory: await getIssueHistory(params.id),
        user,
      };
}
