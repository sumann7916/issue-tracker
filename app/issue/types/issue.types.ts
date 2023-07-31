import { IssueModificationType, StatusType, UserType } from "@prisma/client";
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

export const EditIssueActionType = {
  UPDATE_ASSIGNEE: "UPDATE_ASSIGNEE",
  UPDATE_STATUS: "UPDATE_STATUS",
};

export const IssueStatusTypeList = Object.values(StatusType);

export type CreateIssueFormInput = z.infer<typeof createIssueFormSchema>;

export type CreateIssueData = CreateIssueFormInput & {
  reporter: string;
};

export type UpdateIssueStatusInput = z.infer<typeof updateIssueStatusSchema>;

export type UpdateIssueAssigneeInput = z.infer<
  typeof updateIssueAssigneeSchema
>;

export const IssueEvent = {
  issue_created: "issue_created",
};

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
  issue_history: {
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
