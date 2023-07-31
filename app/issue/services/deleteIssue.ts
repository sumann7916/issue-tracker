import { db } from "~/utils/db.server";

export const deleteIssue = async (id: string, user_id: string) => {
  const issue = await db.issue.findUnique({
    where: { id, reporter_id: user_id },
  });
  if (!issue) {
    return null;
  }

  return await db.issue.delete({
    where: { id },
  });
};
