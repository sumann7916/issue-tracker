import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { loginAction } from "~/actions/login.action";
import LoginForm from "~/components/LoginForm";
import { verifyUserLoader } from "~/loader/verifyUser.loader";

export const action = async (args: ActionArgs) => loginAction(args);

export const loader = async (args: LoaderArgs) => verifyUserLoader(args);
export default function login() {
  return <LoginForm />;
}
