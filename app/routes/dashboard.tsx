import { ActionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import AdminDashboard from "~/components/AdminDashboard";
import { checkIfUsernameExists, createUser } from "~/users/services/createUser";
import { getAdminAndUser } from "~/users/services/getAllUser";
import { addUserValidator } from "~/users/validators/add-user.validator";
import { badRequest } from "~/utils/request.server";

export async function loader() {
  return await getAdminAndUser();
}

export async function action({ request }: ActionArgs) {
  const parseAddUserInput = await addUserValidator.validate(
    await request.formData()
  );
  if (parseAddUserInput.error) {
    return validationError(parseAddUserInput.error);
  }
  if (await checkIfUsernameExists(parseAddUserInput.data.username)) {
    return badRequest({
      fieldErrors: null,
      formError: "Username already exists",
    });
  }
  await createUser(parseAddUserInput.data);
  return redirect("/dashboard");
}

export default function dashboard() {
  const data = useLoaderData<typeof loader>();
  return <AdminDashboard userList={data} />;
}
