import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import IssueCardDetails from "~/components/IssueCardDetails";
import IssueHistoryTable from "~/components/IssueHistoryTable";
import { findOneIssue, getIssueHistory } from "~/issue/services/getIssues";
import { badRequest } from "~/utils/request.server";

export async function loader({ params }: LoaderArgs) {
  const issue = await findOneIssue(params.id);
  if (!issue) {
    return badRequest({
      error: "Issue not found",
    });
  }
  const issueHistory = await getIssueHistory(params.id);
  return { issue, issueHistory };
}
export default function IssueDetails() {
  const { issue, issueHistory } = useLoaderData();
  return (
    <>
      <IssueCardDetails issue={issue} />
      <IssueHistoryTable histories={issueHistory} />
    </>
  );
}
