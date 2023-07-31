import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { findOneIssue } from "~/issue/services/getIssues";
import { getAllUserName } from "~/users/services/getAllUser";

export async function updateIssueloader({ request, params }: LoaderArgs) {
  const user = await getCurrentUser(request);
  if (!user || user.user_type !== UserType.USER) {
    return redirect("/");
  }
  const issue = await findOneIssue(user.id, params.id);
  const userList = await getAllUserName();
  return { issue, userList, userId: user.id };
}
