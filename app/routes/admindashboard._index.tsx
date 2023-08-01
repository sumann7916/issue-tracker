import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AdminDashboard from "~/components/AdminDashboard";
import { getAdminAndUserLoader } from "~/loader/getAdminAndUser.loader";
import { UserDetail } from "~/users/types/user.types";

export const loader = async (args: LoaderArgs) => getAdminAndUserLoader(args);

export default function dashboard() {
  const data = useLoaderData<typeof loader>() as UserDetail[];
  return <AdminDashboard userList={data} />;
}
