import LoginForm from "~/components/LoginForm";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { validateUserAndGetUserId } from "../utils/login.utils";
import { createUserSession } from "../utils/createSession";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { siginServerValidator } from "~/auth/validators/signin.validator";
import { UserNameAndId } from "~/users/types/user-type";

export async function action({ request }: ActionArgs) {
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

export async function loader({ request }: LoaderArgs) {
  if (await getCurrentUser(request)) {
    return redirect("/");
  }
  return null;
}
export default function login() {
  return <LoginForm />;
}
