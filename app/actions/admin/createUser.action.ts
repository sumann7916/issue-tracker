import { UserType } from "@prisma/client";
import { ActionArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { createUser } from "~/users/services/createUser";
import { addUserServerValidator } from "~/users/validators/add-user.validator";

export const createUserAction = async ({ request }: ActionArgs) => {
  const user = await getCurrentUser(request);
  return user?.user_type === UserType.ADMIN
    ? await validateAndCreateUser(await request.formData())
    : redirect("/login");
};

const validateAndCreateUser = async (formData: FormData) => {
  const { data, error } = await addUserServerValidator.validate(formData);
  if (error) {
    return validationError(error);
  }
  await createUser(data);
  return redirect("/admindashboard");
};
