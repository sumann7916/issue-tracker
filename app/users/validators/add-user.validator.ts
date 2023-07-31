import { withZod } from "@remix-validated-form/with-zod";
import { userLoginSchema, zString } from "~/common/types/z.schema";
import { checkIfUsernameExists } from "../services/createUser";

export const AddUserSchema = userLoginSchema
  .extend({
    confirm_password: zString("confirm_password", 10, 100),
    full_name: zString("fullname", 1, 30),
  })
  .refine(
    (schema) => {
      return schema.password === schema.confirm_password;
    },
    {
      message: "Password and Confirm Password do not match",
      path: ["confirm_password"],
    }
  );

export const addUserClientValidator = withZod(AddUserSchema);

export const addUserServerValidator = withZod(
  AddUserSchema.refine(
    async (data) => {
      return !(await checkIfUsernameExists(data.username));
    },
    {
      message: "Username already exists",
      path: ["username"],
    }
  )
);
