import LoginForm from "~/components/LoginForm";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { loginAction } from "~/actions/login.action";
import { verifyUserLoader } from "~/loader/verifyUser.loader";

export const action = async (args: ActionArgs) => loginAction(args);

export const loader = async (args: LoaderArgs) => verifyUserLoader(args);
export default function login() {
  return <LoginForm />;
}
