import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { zString } from "~/common/types/z.schema";

export const CreateIssueFormSchema = z.object({
  summary: zString("summary", 10, 100),
  description: zString("description", 10, 200),
  assignee_id: z.string().uuid(),
});

export const createIssueFormValidator = withZod(CreateIssueFormSchema);
