import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import IssueList from "~/components/IssueList";
import UserNavbar from "~/components/UserNavbar";
import { getIssues } from "~/issue/services/getIssues";

export async function loader({ request }: LoaderArgs) {
  const user = await getCurrentUser(request);
  if (!user || user.user_type !== UserType.USER) {
    return redirect("/login");
  }
  return await getIssues(user.id, false);
}

export default function UserdashIssuesReported() {
  const data = useLoaderData();
  return (
    <>
      <UserNavbar />
      <IssueList issueList={data} />
    </>
  );
}
