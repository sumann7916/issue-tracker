import LoginForm from "~/components/LoginForm";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { validateUserAndGetUserId } from "../utils/login.utils";
import { createUserSession } from "../utils/createSession";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { siginServerValidator } from "~/auth/validators/signin.validator";
import { UserNameAndId } from "~/users/types/user-type";
import { loginAction } from "~/actions/login.action";
import { verifyUserLoader } from "~/loader/verifyUser.loader";

export const action = async (args: ActionArgs) => loginAction(args);

export const loader = async (args: LoaderArgs) => verifyUserLoader(args);
export default function login() {
  return <LoginForm />;
}
