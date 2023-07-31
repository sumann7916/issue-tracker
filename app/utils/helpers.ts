import {
  IssueWithNestedUsers,
  IssueWithReporterAndAssignee,
} from "~/issue/types/issue.types";

export const toIssueWithDetailsDto = (
  issue: IssueWithNestedUsers
): IssueWithReporterAndAssignee => ({
  id: issue.id,
  summary: issue.summary,
  description: issue.description,
  created_at: issue.created_at.toDateString(),
  status: issue.status,
  reporter: issue.reporter.username,
  assignee: issue.assignee.username,
  reporter_id: issue.reporter.id,
  assignee_id: issue.assignee.id,
});
