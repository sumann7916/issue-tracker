import { withZod } from "@remix-validated-form/with-zod";
import { userLoginSchema } from "~/types/z.schema";

export const signinValidator = withZod(userLoginSchema);
