import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import IssueList from "~/components/IssueList";
import UserNavbar from "~/components/UserNavbar";
import { getReportedIssuesLoader } from "~/loader/getReportedIssues.loader";

export const loader = async (args: LoaderArgs) =>
  await getReportedIssuesLoader(args);
export default function UserdashIssuesReported() {
  const data = useLoaderData();
  return (
    <>
      <UserNavbar />
      <IssueList issueList={data} />
    </>
  );
}
