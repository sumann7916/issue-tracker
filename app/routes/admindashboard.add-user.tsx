import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { createUserAction } from "~/actions/createUser.action";
import AddUserForm from "~/components/AddUserForm";
import { verifyAdminLoader } from "~/loader/verifyAdmin.loader";

export const loader = async (args: LoaderArgs) => verifyAdminLoader(args);
export const action = async (actionArgs: ActionArgs) =>
  createUserAction(actionArgs);

export default function AdminAddUser() {
  return <AddUserForm />;
}
