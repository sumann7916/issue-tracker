import { StatusType, UserType } from "@prisma/client";
import {
  createIssueFormSchema,
  updateIssueAssigneeSchema,
  updateIssueStatusSchema,
} from "../validators/issue.validator";
import { z } from "zod";

export interface IssueWithReporterAndAssignee {
  id: string;
  summary: string;
  description: string;
  reporter: string;
  assignee: string;
  assignee_id: string;
  reporter_id: string;
  status: StatusType;
  created_at: string;
}

export type IssueWithNestedUsers = {
  id: string;
  summary: string;
  description: string;
  created_at: Date;
  status: StatusType;
  reporter: {
    username: string;
    id: string;
  };
  assignee: {
    username: string;
    id: string;
  };
};

export interface WhereIssueOptions {
  id: string;
  reporter?: {
    id: string;
    user_type: UserType;
  };
  assignee?: {
    id: string;
    user_type: UserType;
  };
}

export const EditIssueActionType = {
  UPDATE_ASSIGNEE: "UPDATE_ASSIGNEE",
  UPDATE_STATUS: "UPDATE_STATUS",
};

export const IssueStatusTypeList = Object.values(StatusType);

export type CreateIssueFormInput = z.infer<typeof createIssueFormSchema>;

export type CreateIssueData = CreateIssueFormInput & {
  reporter_id: string;
};

export type UpdateIssueStatusInput = z.infer<typeof updateIssueStatusSchema>;

export type UpdateIssueAssigneeInput = z.infer<
  typeof updateIssueAssigneeSchema
>;

export const IssueEvent = {
  issue_created: "issue_created",
};
