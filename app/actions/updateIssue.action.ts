import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { updateIssue } from "~/issue/services/updateIssue";
import { updateIssueServerValidator } from "~/issue/validators/issue.validator";

export async function updateIssueAction({ request, params }: LoaderArgs) {
  if (!params.id) {
    return "error updating Data";
  }
  const user = await getCurrentUser(request);
  if (!user || user.user_type !== UserType.USER) {
    return redirect("/");
  }
  const result = await updateIssueServerValidator.validate(
    await request.formData()
  );
  if (result.error) {
    return validationError(result.error);
  }
  const issue = await updateIssue({
    id: params.id,
    userId: user.id,
    assignee: result.data.assignee,
    status: result.data.status,
  });
  if (!issue) {
    return new Response("Something went wrong");
  }
  return redirect(`/userdashboard/issues/${params.id}`);
}
