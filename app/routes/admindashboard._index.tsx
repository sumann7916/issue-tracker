import { LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getCurrentUser } from "~/auth/services/getCurrentUser";
import AdminDashboard from "~/components/AdminDashboard";
import { getAdminAndUserLoader } from "~/loader/getAdminAndUser.loader";
import { getAdminAndUser } from "~/users/services/getAllUser";
import { UserDetail } from "~/users/types/UserDetail";

export const loader = async (args: LoaderArgs) => getAdminAndUserLoader(args);

export default function dashboard() {
  const data = useLoaderData<typeof loader>() as UserDetail[];
  return <AdminDashboard userList={data} />;
}
