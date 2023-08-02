import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useEventSource } from "remix-utils";
import AdminDashboard from "~/components/AdminDashboard";
import { getAdminAndUserLoader } from "~/loader/getAdminAndUser.loader";
import { UserDetail } from "~/users/types/user.types";

export const loader = async (args: LoaderArgs) => getAdminAndUserLoader(args);

export default function dashboard() {
  const event_url = `issue/subscribe/${data.userId}`;
  let message = useEventSource(event_url, {
    event: "new-issue",
  });
  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, [message]);

  const data = useLoaderData<typeof loader>() as UserDetail[];
  return <AdminDashboard userList={data} />;
}
