import { UserType } from "@prisma/client";
import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import IssueList from "~/components/IssueList";
import UserNavbar from "~/components/UserNavbar";
import { getAssignedIssuesLoader } from "~/loader/getIssues.loader";

export const loader = async (args: LoaderArgs) =>
  await getAssignedIssuesLoader(args);

export default function UserdashIssuesAssigned() {
  const data = useLoaderData();
  return (
    <>
      <UserNavbar />
      <IssueList issueList={data} />
    </>
  );
}
