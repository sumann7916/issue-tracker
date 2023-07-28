import { withZod } from "@remix-validated-form/with-zod";
import { userLoginSchema, zString } from "~/common/types/z.schema";

export const AddUserSchema = userLoginSchema
  .extend({
    confirm_password: zString("confirm_password", 10, 100),
    full_name: zString("fullname", 1, 30),
  })
  .refine((schema) => schema.password !== schema.confirm_password, {
    message: "Password and Confirm Password do not match",
  });

export const addUserValidator = withZod(AddUserSchema);
