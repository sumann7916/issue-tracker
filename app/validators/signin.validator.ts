import { withZod } from "@remix-validated-form/with-zod";
import { userLoginSchema } from "~/common/types/z.schema";

export const signinValidator = withZod(userLoginSchema);
