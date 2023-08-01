import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { zString } from "~/common/types/z.schema";
import { StatusType } from "@prisma/client";
import {
  verifyAssigneeUsername,
} from "../services/createIssue";
import { findOneUser } from "~/users/services/getAllUser";
import { WhereUserOptions, SelectUserOptions } from "~/users/types/user.types";

export const createIssueFormSchema = z.object({
  summary: zString("summary", 10, 100),
  description: zString("description", 10, 200),
  assignee: z.string().min(1),
});

export const createIssueClientValidator = withZod(createIssueFormSchema);

export const createIssueServerValidator = withZod(
  createIssueFormSchema.refine(
    (data) => verifyAssigneeUsername(data.assignee),
    {
      message: "Assignee Does not exist",
      path: ["assignee"],
    }
  )
);

export const updateIssueSchema = z
  .object({
    status: z
      .enum([StatusType.DONE, StatusType.IN_PROGRESS, StatusType.TODO])
      .optional(),
    assignee: z.string().optional(),
  })
  .refine(
    (data) => {
      return !(!data.assignee && !data.status);
    },

    {
      message: "Empty Field",
      path: ["status", "assignee"],
    }
  );

export const updateIssueClientValidator = withZod(updateIssueSchema);

export const updateIssueServerValidator = withZod(
  updateIssueSchema.refine(
    async (data) => {
      if (data.assignee) {
        const where: WhereUserOptions = { username: data.assignee };
        const select: SelectUserOptions = { id: true };
        return !((await findOneUser(where, select)) === null);
      }
      return true;
    },
    { message: "Assignee Does not exist", path: ["assignee"] }
  )
);
export const updateIssueStatusSchema = z.object({
  status: z.enum([StatusType.DONE, StatusType.IN_PROGRESS, StatusType.TODO]),
});

export const updateIssueStatusValidator = withZod(updateIssueStatusSchema);

export const updateIssueAssigneeSchema = z.object({
  assignee_id: z.string().uuid(),
});

export const updateIssueAssigneeValidator = withZod(updateIssueAssigneeSchema);
