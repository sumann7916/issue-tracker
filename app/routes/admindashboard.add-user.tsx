import { UserType } from "@prisma/client";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import React from "react";
import { validationError } from "remix-validated-form";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import AddUserForm from "~/components/AddUserForm";
import { createUser } from "~/users/services/createUser";
import { addUserServerValidator } from "~/users/validators/add-user.validator";

export async function loader({ request }: LoaderArgs) {
  const user = await getCurrentUser(request);
  if (!user || user.user_type !== UserType.ADMIN) {
    return redirect("/login");
  }
  return null;
}
export async function action({ request }: ActionArgs) {
  const { data, error } = await addUserServerValidator.validate(
    await request.formData()
  );
  if (error) {
    console.log("I am being called");
    return validationError(error);
  }
  await createUser(data);
  return redirect("/admindashboard");
}

export default function AdminAddUser() {
  return <AddUserForm />;
}
