import { LoaderArgs } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { getAllUser, getAllUserName } from "~/users/services/getAllUser";
import { badRequest } from "~/utils/request.server";

export async function loader({ request }: LoaderArgs) {
  if (!(await getCurrentUser(request))) {
    return badRequest({
      error: "Not Authorized",
    });
  }
  return await getAllUserName();
}
