import { withZod } from "@remix-validated-form/with-zod";
import { userLoginSchema } from "~/common/types/z.schema";
import { validateUserAndGetUserId } from "~/utils/login.utils";

export const signinClientValidator = withZod(userLoginSchema);

export const siginServerValidator = withZod(
  userLoginSchema.refine(
    async (data) => {
      return await validateUserAndGetUserId(data);
    },
    {
      message: "Username/Password combination do not match",
      path: ["password"],
    }
  )
);
