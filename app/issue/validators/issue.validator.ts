import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { zString } from "~/common/types/z.schema";
import { StatusType } from "@prisma/client";

export const createIssueFormSchema = z.object({
  summary: zString("summary", 10, 100),
  description: zString("description", 10, 200),
  assignee_id: z.string().uuid(),
});

export const createIssueFormValidator = withZod(createIssueFormSchema);

export const updateIssueStatusSchema = z.object({
  status: z.enum([StatusType.DONE, StatusType.IN_PROGRESS, StatusType.TODO]),
});

export const updateIssueStatusValidator = withZod(updateIssueStatusSchema);

export const updateIssueAssigneeSchema = z.object({
  assignee_id: z.string().uuid(),
});

export const updateIssueAssigneeValidator = withZod(updateIssueAssigneeSchema);
