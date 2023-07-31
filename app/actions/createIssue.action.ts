import { User, UserType } from "@prisma/client";
import { ActionArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { createIssue } from "~/issue/services/createIssue";
import { createIssueServerValidator } from "~/issue/validators/issue.validator";

export async function createIssueAction({ request }: ActionArgs) {
  const user = (await getCurrentUser(request)) as User;
  if (!user || user.user_type !== UserType.USER) {
    return redirect("/login");
  }
  const { data, error } = await createIssueServerValidator.validate(
    await request.formData()
  );

  if (error) {
    return validationError(error);
  }

  const issue = await createIssue({ ...data, reporter: user.username });
  return redirect(`/userdashboard/issues/${issue.id}`);
}
