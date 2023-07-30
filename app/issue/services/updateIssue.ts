import { IssueModificationType, StatusType } from "@prisma/client";
import { db } from "~/utils/db.server";

export type UpdateAssigneeDto = {
  //Updating Assignee should only be possible when user_id is reporter_id
  where: {
    id: string;
    reporter_id: string;
  };
  data: {
    assignee_id: string;
  };
};

export type UpdateStatusDto = {
  //Updating Status should only be possible when user_id is assignee_id
  where: {
    id: string;
    assignee_id: string;
  };
  data: {
    status: StatusType;
  };
};

export type UpdateIssueDto = UpdateAssigneeDto | UpdateStatusDto;

export type IssueWithAssignee = {
  id: string;
  status: StatusType;
  assignee: {
    username: string;
  };
};

export const updateIssue = async ({ where, data }: UpdateIssueDto) => {
  //Check if issue exists
  const initialIssue = await db.issue.findUnique({
    where,
    select: {
      id: true,
      status: true,
      assignee: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!initialIssue) {
    return null;
  }
  //TODO use transaction
  const issue = await db.issue.update({
    where,
    data,
    select: {
      id: true,
      status: true,
      assignee: {
        select: {
          username: true,
        },
      },
    },
  });

  const modification_type = getIssueModificationType(data);
  const change_details = getIssueChangeDetails(
    initialIssue,
    issue,
    modification_type
  );

  //Only update issue history if there is an actual change in the data
  if (
    issue.status !== initialIssue.status ||
    issue.assignee.username !== initialIssue.assignee.username
  ) {
    await db.issueHistory.create({
      data: {
        modification_type,
        issue_id: issue.id,
        change_details,
      },
    });
  }
  return issue;
};

export const getIssueModificationType = (data: UpdateIssueDto["data"]) => {
  return "status" in data
    ? IssueModificationType.StatusChange
    : IssueModificationType.AssigneeChange;
};

export const getIssueChangeDetails = (
  prevState: IssueWithAssignee,
  currentState: IssueWithAssignee,
  modType: Omit<IssueModificationType, "Creation">
) => {
  return modType === IssueModificationType.StatusChange
    ? `Issue Status Changed from ${prevState.status} to ${currentState.status}`
    : `Issue Assignee Changed from ${prevState.assignee.username} to ${currentState.assignee.username}`;
};
