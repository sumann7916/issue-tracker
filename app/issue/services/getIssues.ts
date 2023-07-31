import { db } from "~/utils/db.server";
import { toIssueWithDetailsDto } from "~/utils/helpers";
import { WhereIssueOptions } from "../types/issue.types";

//Get Assigned or Reported. Assigned by default
export const getIssues = async (id: string, assigned = true) => {
  const where = assigned ? { assignee_id: id } : { reporter_id: id };
  const issues = await db.issue.findMany({
    where,
    select: {
      id: true,
      summary: true,
      description: true,
      created_at: true,
      status: true,
      reporter: {
        select: {
          id: true,
          username: true,
        },
      },
      assignee: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  return issues.map(toIssueWithDetailsDto);
};

export const findOneIssue = async (user_id: string, id?: string) => {
  if (!id) {
    return null;
  }
  const issue = await db.issue.findUnique({
    where: {
      id,
      OR: [
        {
          reporter_id: user_id,
        },
        {
          assignee_id: user_id,
        },
      ],
    },
    select: {
      id: true,
      summary: true,
      description: true,
      created_at: true,
      status: true,
      reporter: {
        select: {
          username: true,
          id: true,
        },
      },
      assignee: {
        select: {
          username: true,
          id: true,
        },
      },
    },
  });
  return issue ? toIssueWithDetailsDto(issue) : null;
};

export const getIssueHistory = async (issue_id?: string) => {
  if (!issue_id) {
    return [];
  }
  return await db.issueHistory.findMany({
    where: {
      issue_id,
    },
    select: {
      id: true,
      modification_type: true,
      change_details: true,
      created_at: true,
    },
    orderBy: {
      created_at: "asc",
    },
  });
};

export async function findReportedIssue(id: string, user_id: string) {
  return await db.issue.findUnique({
    where: { id, reporter_id: user_id },
  });
}
