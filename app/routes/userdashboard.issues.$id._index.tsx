import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { deleteIssueAction } from "~/actions/deleteIssue.action";
import IssueCardDetails from "~/components/IssueCardDetails";
import IssueHistoryTable from "~/components/IssueHistoryTable";
import UserNavbar from "~/components/UserNavbar";
import { getIssueDetailsLoader } from "~/loader/issueDetails.loader";

export const loader = async (args: LoaderArgs) => getIssueDetailsLoader(args);
export const action = async (args: ActionArgs) => deleteIssueAction(args);
export default function IssueDetails() {
  const { issue, issueHistory, user } = useLoaderData();
  if (!issue) {
    return "Issue Does not exist";
  }
  return (
    <>
      <UserNavbar />
      <IssueCardDetails issue={issue} user_id={user.id} />
      <IssueHistoryTable histories={issueHistory} />
    </>
  );
}
