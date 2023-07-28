import { db } from "~/utils/db.server";
import { CreateIssueData } from "../types/create-issue.type";
import {
  SelectUserOptions,
  WhereUserOptions,
} from "~/users/types/user-options";
import { findOneUser } from "~/users/services/getAllUser";
import { badRequest } from "~/utils/request.server";

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
  return await db.issue.create({
    data,
  });
};

export const verifyAssignee = async (id: string) => {
  const where: WhereUserOptions = { id };
  const select: SelectUserOptions = { id: true };
  return await findOneUser(where, select);
};
