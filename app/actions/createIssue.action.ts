import { User, UserType } from "@prisma/client";
import { ActionArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { createIssue } from "~/issue/services/createIssue";
import { createIssueServerValidator } from "~/issue/validators/issue.validator";

export async function createIssueAction({ request }: ActionArgs) {
  const user = (await getCurrentUser(request)) as User;
  return user?.user_type !== UserType.USER
    ? redirect("/login")
    : await validateAndCreateIssue(await request.formData(), user.username);
}

const validateAndCreateIssue = async (formData: FormData, reporter: string) => {
  const { data, error } = await createIssueServerValidator.validate(formData);
  if (error) {
    return validationError(error);
  }
  const issue = await createIssue({ ...data, reporter });
  return redirect(`/userdashboard/issues/${issue.id}`);
};
