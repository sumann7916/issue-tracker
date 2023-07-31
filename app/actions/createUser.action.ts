import { UserType } from "@prisma/client";
import { ActionArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { createUser } from "~/users/services/createUser";
import { addUserServerValidator } from "~/users/validators/add-user.validator";

export const createUserAction = async ({ request }: ActionArgs) => {
  const user = await getCurrentUser(request);
  if (!user || user.user_type !== UserType.ADMIN) {
    return redirect("/login");
  }
  const { data, error } = await addUserServerValidator.validate(
    await request.formData()
  );
  if (error) {
    return validationError(error);
  }
  await createUser(data);
  return redirect("/admindashboard");
};
