import { IssueModificationType, StatusType } from "@prisma/client";
import { db } from "~/utils/db.server";
import { IssueEvent } from "../types/issue.types";
import { emitter } from "~/utils/emitter.server";

export type UpdateIssueDto = {
  id: string;
  userId: string;
  assignee?: string;
  status?: StatusType;
};

export type WhereIssueOptions = {
  id: string;
  reporter_id?: string;
  assignee_id?: string;
};

export type IssueDataOptions = {
  assignee?: {
    connect: {
      username: string;
    };
  };
  status?: StatusType;
  issues_history: {
    create: {
      modification_type: IssueModificationType;
      change_details: string;
    }[];
  };
};

export type IssueWithAssignee = {
  id: string;
  status: StatusType;
  assignee: {
    username: string;
  };
};

export const updateIssue = async (updateIssueDto: UpdateIssueDto) => {
  const where = buildUpdateWhereData(updateIssueDto);
  const currentIssueState = await db.issue.findUnique({
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
  if (!currentIssueState) {
    return null;
  }
  const data = buildUpdateData(updateIssueDto, currentIssueState); // Assuming buildUpdateData is a function taking 'updateIssueDto' as an argument and returning the necessary data object
  const issue = await db.issue.update({
    where,
    data,
    select: {
      id: true,
      assignee: {
        select: {
          id: true,
        },
      },
      reporter: {
        select: {
          username: true,
        },
      },
    },
  });

  //TODO Create update event probably
  const event_url = `${IssueEvent.issue_created + "/" + issue.assignee.id}`;
  emitter.emit(event_url, issue.reporter.username);
  return issue;
};

export const getIssueChangeDetails = (
  prevState: string | StatusType,
  currentState: string | StatusType,
  modType: Omit<IssueModificationType, "Creation">
) => {
  return modType === IssueModificationType.StatusChange
    ? `Issue Status Changed from ${prevState} to ${currentState}`
    : `Issue Assignee Changed from ${prevState} to ${currentState}`;
};

const buildUpdateWhereData = ({
  id,
  userId,
  status,
  assignee,
}: UpdateIssueDto) => {
  const where: WhereIssueOptions = { id };
  if (assignee) {
    where.reporter_id = userId;
  }
  if (status) {
    where.assignee_id = userId;
  }
  return where;
};

//TODO refactor this, improve readibility
//Probably check if no changes in the to Update Data upward instead of this

const buildUpdateData = (
  updateIssueDto: UpdateIssueDto,
  issue: IssueWithAssignee
) => {
  const data: IssueDataOptions = { issues_history: { create: [] } };
  if (updateIssueDto.assignee) {
    data.assignee = { connect: { username: updateIssueDto.assignee } };
  }
  if (updateIssueDto.status) {
    data.status = updateIssueDto.status;
  }

  if (
    updateIssueDto.assignee &&
    issue.assignee.username !== updateIssueDto.assignee
  ) {
    data.issues_history.create[0] = {
      modification_type: IssueModificationType.AssigneeChange,
      change_details: getIssueChangeDetails(
        issue.assignee.username,
        updateIssueDto.assignee,
        IssueModificationType.AssigneeChange
      ),
    };
  }

  if (updateIssueDto.status && issue.status !== updateIssueDto.status) {
    data.issues_history.create[1] = {
      modification_type: IssueModificationType.StatusChange,
      change_details: getIssueChangeDetails(
        issue.status,
        updateIssueDto.status,
        IssueModificationType.StatusChange
      ),
    };
  }

  return data;
};
