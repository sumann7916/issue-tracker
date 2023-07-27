import { useLoaderData } from "@remix-run/react";
import AdminDashboard from "~/components/AdminDashboard";
import { getAllUser } from "~/services/getAllUser";

export async function loader() {
  return await getAllUser();
}

export default function dashboard() {
  const data = useLoaderData<typeof loader>();
  return <AdminDashboard userList={data} />;
}
