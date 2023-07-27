import LoginForm from "~/components/LoginForm";
import { ActionArgs } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { signinValidator } from "../validators/signin.validator";
import { validateUserAndGetUserId } from "../utils/login.utils";
import { badRequest } from "../utils/request.server";
import { createUserSession } from "../utils/createSession";

export async function action({ request }: ActionArgs) {
  const parseSignInInput = await signinValidator.validate(
    await request.formData()
  );
  if (parseSignInInput.error) {
    return validationError(parseSignInInput.error);
  }

  const userAndUserId = await validateUserAndGetUserId(parseSignInInput.data);
  if (!userAndUserId) {
    return badRequest({
      fieldErrors: null,
      formError: "Username/Password combination is incorrect",
    });
  }
  return await createUserSession(
    userAndUserId.id,
    userAndUserId.user_type,
    "/"
  );
}
export default function login() {
  return <LoginForm />;
}