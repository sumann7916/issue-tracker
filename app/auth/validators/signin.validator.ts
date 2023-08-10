import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { userLoginSchema } from "~/common/types/z.schema";
import { validateUserAndGetUserId } from "~/utils/login.utils";

export const signinClientValidator = withZod(userLoginSchema);

export const signinServerValidator = withZod(
  userLoginSchema.transform(async (data, ctx) => {
    const user = await validateUserAndGetUserId(data);
    if (!user) {
      ctx.addIssue({
        message: "Username/Password combination do not match",
        path: ["password"],
        code: z.ZodIssueCode.custom,
      });
      return z.NEVER;
    }
    return user;
  })
);
