import { db } from "~/utils/db.server";
import { toIssueWithDetailsDto } from "~/utils/helpers";

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
  return issues.map(toIssueWithDetailsDto);
};

export const findOneIssue = async (id?: string) => {
  if (!id) {
    return null;
  }
  const issue = await db.issue.findUnique({
    where: {
      id,
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
        },
      },
      assignee: {
        select: {
          username: true,
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
