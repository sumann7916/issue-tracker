import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { findOneIssue, getIssueHistory } from "~/issue/services/getIssues";

export async function getIssueDetailsLoader({ request, params }: LoaderArgs) {
  const user = await getCurrentUser(request);
  if (!user || user.user_type !== UserType.USER) {
    return redirect("/login");
  }

  const issue = await findOneIssue(user.id, params.id);

  const issueHistory = await getIssueHistory(params.id);
  return { issue, issueHistory, user };
}
