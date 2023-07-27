import { UserType } from "@prisma/client";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET ?? "sessionsecret";

const storage = createCookieSessionStorage({
  cookie: {
    name: "session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export const createUserSession = async (
  userId: string,
  user_type: UserType,
  redirectTo: string
) => {
  console.log(redirectTo);
  const session = await storage.getSession();
  session.set("userId", userId);
  session.set("user_type", user_type);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};
