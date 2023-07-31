import { ActionArgs } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { siginServerValidator } from "~/auth/validators/signin.validator";
import { UserNameAndId } from "~/users/types/user-type";
import { createUserSession } from "~/utils/createSession";
import { validateUserAndGetUserId } from "~/utils/login.utils";

export async function loginAction({ request }: ActionArgs) {
  const { data, error } = await siginServerValidator.validate(
    await request.formData()
  );
  if (error) {
    return validationError(error);
  }
  //TODO not call this twice and use transform with zod
  const userAndUserId = (await validateUserAndGetUserId(data)) as UserNameAndId;

  return await createUserSession(
    userAndUserId.id,
    userAndUserId.user_type,
    "/"
  );
}
