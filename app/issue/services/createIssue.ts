import { db } from "~/utils/db.server";
import {
  SelectUserOptions,
  WhereUserOptions,
} from "~/users/types/user-options";
import { findOneUser } from "~/users/services/getAllUser";
import { CreateIssueData, IssueEvent } from "../types/issue.types";
import { IssueModificationType } from "@prisma/client";
import { emitter } from "~/utils/emitter.server";

export const createIssue = async (createIssueData: CreateIssueData) => {
  const issue = await db.issue.create({
    data: {
      summary: createIssueData.summary,
      description: createIssueData.description,
      assignee: {
        connect: {
          username: createIssueData.assignee,
        },
      },
      reporter: {
        connect: {
          username: createIssueData.reporter,
        },
      },
      issues_history: {
        create: {
          modification_type: IssueModificationType.Creation,
          change_details: `Issue Created By ${createIssueData.reporter} and assigned to ${createIssueData.assignee}`,
        },
      },
    },
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
  const event_url = `${IssueEvent.issue_created + "/" + issue.assignee.id}`;
  emitter.emit(event_url, issue.reporter.username);
  return issue;
};

export const verifyAssignee = async (id: string) => {
  const where: WhereUserOptions = { id };
  const select: SelectUserOptions = { id: true };
  return await findOneUser(where, select);
};

export const verifyAssigneeUsername = async (username: string) => {
  const where: WhereUserOptions = { username };
  const select: SelectUserOptions = { id: true };
  return (await findOneUser(where, select)) !== null;
};
