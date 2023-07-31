import { UserType } from "@prisma/client";
import { LoaderArgs, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import IssueCardDetails from "~/components/IssueCardDetails";
import IssueHistoryTable from "~/components/IssueHistoryTable";
import UserNavbar from "~/components/UserNavbar";
import { findOneIssue, getIssueHistory } from "~/issue/services/getIssues";
import {
  UpdateAssigneeDto,
  UpdateStatusDto,
} from "~/issue/services/updateIssue";
import { updateIssue } from "~/issue/services/updateIssue";
import { EditIssueActionType } from "~/issue/types/issue.types";
import {
  updateIssueAssigneeValidator,
  updateIssueStatusValidator,
} from "~/issue/validators/issue.validator";
import { badRequest } from "~/utils/request.server";

export async function loader({ request, params }: LoaderArgs) {
  const user = await getCurrentUser(request);
  if (!user || user.user_type !== UserType.USER) {
    return redirect("/login");
  }

  const issue = await findOneIssue(user.id, params.id);
  const issueHistory = await getIssueHistory(params.id);
  return { issue, issueHistory, user };
}

export async function action({ request, params }: LoaderArgs) {
  const user = await getCurrentUser(request);
  if (!user || user.user_type !== UserType.USER) {
    return redirect("/login");
  }
  if (!params.id) {
    return "error updating Data";
  }
  const formData = await request.formData();
  switch (formData.get("action")) {
    case EditIssueActionType.UPDATE_ASSIGNEE: {
      const parseInput = await updateIssueAssigneeValidator.validate(formData);
      if (parseInput.error) {
        return badRequest({
          formError: "Invalid input",
        });
      }
      const updateAssigneeDto: UpdateAssigneeDto = {
        where: {
          id: params.id,
          reporter_id: user.id,
        },
        data: {
          assignee_id: parseInput.data.assignee_id,
        },
      };
      await updateIssue(updateAssigneeDto);
      console.log("Updated Successfully");
      return json({ message: "Update Assignee" });
    }
    case EditIssueActionType.UPDATE_STATUS: {
      const parseInput = await updateIssueStatusValidator.validate(formData);
      if (parseInput.error) {
        return badRequest({
          formError: "Invalid Input",
        });
      }
      const updateStatusDto: UpdateStatusDto = {
        where: {
          id: params.id,
          assignee_id: user.id,
        },
        data: {
          status: parseInput.data.status,
        },
      };
      await updateIssue(updateStatusDto);
      return json({
        message: "Update Status Successfully",
      });
    }
  }
}
export default function IssueDetails() {
  const { issue, issueHistory, user } = useLoaderData();
  if (!issue) {
    return "Issue Does not exist";
  }
  return (
    <>
      <UserNavbar />
      <IssueCardDetails issue={issue} user_id={user.id} />
      <IssueHistoryTable histories={issueHistory} />
      <Outlet />
    </>
  );
}
