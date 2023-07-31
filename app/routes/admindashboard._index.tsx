import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import AdminDashboard from "~/components/AdminDashboard";
import { createUser } from "~/users/services/createUser";
import { getAdminAndUser } from "~/users/services/getAllUser";
import { UserDetail } from "~/users/types/UserDetail";
import { addUserServerValidator } from "~/users/validators/add-user.validator";

export async function loader({ request }: LoaderArgs) {
  const user = getCurrentUser(request);
  if (!user) {
    return redirect("/login");
  }
  return await getAdminAndUser();
}

export async function action({ request }: ActionArgs) {
  console.log("I am called");
  //   const { data, error } = await addUserServerValidator.validate(
  //     await request.formData()
  //   );
  //   if (error) {
  //     console.log("I am being called");
  //     return validationError(error);
  //   }
  //   await createUser(data);
  //   return redirect("/dashboard");
}

export default function dashboard() {
  const data = useLoaderData<typeof loader>() as UserDetail[];
  return <AdminDashboard userList={data} />;
}
