import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { updateIssueAction } from "~/actions/updateIssue.action";
import EditIssueForm from "~/components/EditIssueForm";
import { IssueWithReporterAndAssignee } from "~/issue/types/issue.types";
import { updateIssueloader } from "~/loader/updateIssue.loader";

export const loader = async (args: LoaderArgs) => updateIssueloader(args);
export const action = async (args: ActionArgs) => updateIssueAction(args);

const UserDashboardIssueEdit = () => {
  const { issue, userList, userId } = useLoaderData() as {
    issue: IssueWithReporterAndAssignee;
    userList: string[];
    userId: string;
  };
  if (!issue) {
    return "Issue Does not exist";
  }
  return (
    <EditIssueForm
      isReporter={issue.reporter_id === userId}
      isAssignee={issue.assignee_id === userId}
      userList={userList}
    />
  );
};

export default UserDashboardIssueEdit;
