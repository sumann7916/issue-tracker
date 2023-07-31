import { UserType } from "@prisma/client";
import { LoaderArgs, redirect } from "@remix-run/node";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
export async function loader({ request }: LoaderArgs) {
  const user = await getCurrentUser(request);
  if (!user) {
    return redirect("/login");
  }
  if (user.user_type === UserType.ADMIN) {
    return redirect("/admindashboard");
  }
  if (user.user_type === UserType.USER) {
    return redirect("/userdashboard");
  }
}
