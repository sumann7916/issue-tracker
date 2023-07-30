import { UserType } from "@prisma/client";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useEventSource } from "remix-utils";
import { validationError } from "remix-validated-form";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import Toast from "~/components/Toast";
import UserDashboard from "~/components/UserDashboard";
import { createIssue } from "~/issue/services/createIssue";
import { createIssueFormValidator } from "~/issue/validators/issue.validator";
import { getAllUser } from "~/users/services/getAllUser";
import { UserIdAndUsername } from "~/users/types/UserDetail";

export async function loader({ request }: LoaderArgs) {
  const user = await getCurrentUser(request);
  if (!user || user.user_type !== UserType.USER) {
    return redirect("/login");
  }

  return await getAllUser();
}

export async function action({ request }: ActionArgs) {
  const user = await getCurrentUser(request);
  if (!user) {
    return redirect("/login");
  }
  const parseAddIssueInput = await createIssueFormValidator.validate(
    await request.formData()
  );
  if (parseAddIssueInput.error) {
    console.log(parseAddIssueInput.submittedData);
    console.log(parseAddIssueInput.error);
    return validationError(parseAddIssueInput.error);
  }

  await createIssue({ ...parseAddIssueInput.data, reporter_id: user.id });
  return redirect("/userdash");
}

export default function userdash() {
  const data = useLoaderData() as UserIdAndUsername[];
  let issue = useEventSource("issue/subscribe", {
    event: "issue",
  });
  console.log(issue);
  useEffect(() => {
    console.log(issue);
  }, [issue]);
  return (
    <>
      <UserDashboard userList={data} />
    </>
  );
}
