import { LoaderArgs, redirect } from "@remix-run/node";
import { getUserSession } from "~/auth/services/getCurrentUser";
import { destroySession } from "~/utils/createSession";

export async function loader({ request }: LoaderArgs) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
