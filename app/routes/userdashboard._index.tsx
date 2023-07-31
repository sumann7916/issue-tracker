import { User, UserType } from "@prisma/client";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useEventSource } from "remix-utils";
import { validationError } from "remix-validated-form";
import { createIssueAction } from "~/actions/createIssue.action";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import UserDashboard from "~/components/UserDashboard";
import { createIssue } from "~/issue/services/createIssue";
import {
  createIssueClientValidator,
  createIssueServerValidator,
} from "~/issue/validators/issue.validator";
import { userDashboardloader } from "~/loader/userDashboard.loader";
import { getAllUserName } from "~/users/services/getAllUser";

export const loader = async (args: LoaderArgs) => userDashboardloader(args);
export const action = async (args: ActionArgs) => createIssueAction(args);

export default function userdash() {
  const data = useLoaderData() as {
    users: string[];
    userId: number;
  };
  const event_url = `issue/subscribe/${data.userId}`;
  let message = useEventSource(event_url, {
    event: "new-issue",
  });
  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, [message]);
  return (
    <>
      <UserDashboard userList={data.users} />
    </>
  );
}
