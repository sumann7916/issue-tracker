import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { deleteIssue } from "~/issue/services/deleteIssue";

export async function deleteIssueAction({ request, params }: LoaderArgs) {
  const user = await getCurrentUser(request);
  return user?.user_type !== UserType.USER
    ? redirect("/login")
    : validateAndDeleteIssue(user.id, params.id);
}

const validateAndDeleteIssue = async (userId: string, issueId?: string) => {
  if (!issueId) {
    return new Response("Issue does not exist");
  }
  const issue = await deleteIssue(issueId, userId);
  return issue
    ? redirect("/userdashboard")
    : new Response("Issue does not exist");
};
