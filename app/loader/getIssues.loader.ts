import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { getIssues } from "~/issue/services/getIssues";

export async function getAssignedIssuesLoader({ request }: LoaderArgs) {
  const user = await getCurrentUser(request);
  user?.user_type !== UserType.USER
    ? redirect("/login")
    : await getIssues(user.id);
}
