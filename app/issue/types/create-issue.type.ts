import { z } from "zod";
import { CreateIssueFormSchema } from "../validators/create-issue.validator";

export type CreateIssueFormInput = z.infer<typeof CreateIssueFormSchema>;

export type CreateIssueData = CreateIssueFormInput & {
  reporter_id: string;
};
