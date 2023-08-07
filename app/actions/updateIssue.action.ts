import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { updateIssue } from "~/issue/services/updateIssue";
import { updateIssueServerValidator } from "~/issue/validators/issue.validator";

export async function updateIssueAction({ request, params }: LoaderArgs) {
  if (!params.id) {
    return new Response("Error Updating Data");
  }

  const user = await getCurrentUser(request);
  return user?.user_type !== UserType.USER
    ? redirect("/")
    : validateAndUpdateIssue(await request.formData(), params.id, user.id);
}


const validateAndUpdateIssue = async (
  formData: FormData,
  id: string,
  userId: string
) => {
  const { data, error } = await updateIssueServerValidator.validate(formData);
  if (error) {
    return validationError(error);
  }
  const issue = await updateIssue({
    id,
    userId,
    assignee: data.assignee,
    status: data.status,
  });
  return issue
    ? redirect(`/userdashboard/issues/${id}`)
    : new Response(`Something went wrong`);
};
