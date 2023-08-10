import { ActionArgs } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { signinServerValidator } from "~/auth/validators/signin.validator";
import { UserNameAndId } from "~/users/types/user-type";
import { createUserSession } from "~/utils/createSession";
import { validateUserAndGetUserId } from "~/utils/login.utils";

export async function loginAction({ request }: ActionArgs) {
  const { data, error } = await signinServerValidator.validate(
    await request.formData()
  );
  if (error) {
    return validationError(error);
  }

  return await createUserSession(data.id, data.user_type, "/");
}
