import { StatusType } from "@prisma/client";

export interface IssueWithReporterAndAssignee {
  id: string;
  summary: string;
  description: string;
  reporter: string;
  assignee: string;
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
  };
  assignee: {
    username: string;
  };
};
