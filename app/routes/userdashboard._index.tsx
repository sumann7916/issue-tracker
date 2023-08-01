import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useEventSource } from "remix-utils";
import { createIssueAction } from "~/actions/createIssue.action";
import UserDashboard from "~/components/UserDashboard";
import { userDashboardloader } from "~/loader/userDashboard.loader";

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
