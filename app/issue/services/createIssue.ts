import { db } from "~/utils/db.server";
import {
  SelectUserOptions,
  WhereUserOptions,
} from "~/users/types/user-options";
import { findOneUser } from "~/users/services/getAllUser";
import { badRequest } from "~/utils/request.server";
import { CreateIssueData, IssueEvent } from "../types/issue.types";
import { IssueModificationType } from "@prisma/client";
import { emitter } from "~/emitter.server";

export const createIssue = async ({
  summary,
  description,
  assignee_id,
  reporter_id,
}: CreateIssueData) => {
  const where: WhereUserOptions = { id: assignee_id };
  const select: SelectUserOptions = { id: true };
  const assignee = await findOneUser(where, select);
  if (!assignee) {
    return badRequest({
      formError: "Assignee User does not exist",
    });
  }
  const data = {
    summary,
    description,
    assignee_id,
    reporter_id,
  };
  const issue = await db.issue.create({
    data,
    select: {
      id: true,
      reporter: {
        select: {
          username: true,
        },
      },
      assignee: {
        select: {
          username: true,
        },
      },
    },
  });
  const issueHistory = await db.issueHistory.create({
    data: {
      modification_type: IssueModificationType.Creation,
      change_details: `Issue Created By ${issue.reporter.username} and assigned to ${issue.assignee.username}`,
      issue_id: issue.id,
    },
  });
  const event_url = `${IssueEvent.issue_created + "/" + assignee_id}`;
  console.log(event_url);
  emitter.emit(event_url, issue.reporter);
  return issue;
};

export const verifyAssignee = async (id: string) => {
  const where: WhereUserOptions = { id };
  const select: SelectUserOptions = { id: true };
  return await findOneUser(where, select);
};
