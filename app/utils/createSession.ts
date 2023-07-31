import { UserType } from "@prisma/client";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { useEventSource } from "remix-utils";

const sessionSecret = process.env.SESSION_SECRET ?? "sessionsecret";

type SessionData = {
  userId: string;
  user_type: UserType;
};

type SessionFlashData = {
  error: string;
};

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      secure: process.env.NODE_ENV === "production",
      secrets: [sessionSecret],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 24 * 30,
      httpOnly: true,
    },
  });

export const createUserSession = async (
  userId: string,
  user_type: UserType,
  redirectTo: string
) => {
  const session = await getSession();
  session.set("userId", userId);
  session.set("user_type", user_type);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
