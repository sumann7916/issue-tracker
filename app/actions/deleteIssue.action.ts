import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { deleteIssue } from "~/issue/services/deleteIssue";

export async function deleteIssueAction({ request, params }: LoaderArgs) {
  const user = await getCurrentUser(request);
  if (!user || user.user_type !== UserType.USER) {
    return redirect("/login");
  }
  if (!params.id) {
    return new Response("Issue does not exist");
  }
  const issue = await deleteIssue(params.id, user.id);
  if (!issue) {
    return new Response("Issue Not found");
  }
  return redirect("/userdashboard");
}
