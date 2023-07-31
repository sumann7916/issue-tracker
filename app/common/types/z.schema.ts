import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";

export const zString = (field: string, minLength = 1, maxLength = 50) =>
  extendApi(z.string().min(minLength).max(maxLength), {
    description: `The ${field} of the object`,
    type: "string",
    minLength,
    maxLength,
  });

export const userLoginSchema = z.object({
  username: zString("username", 1, 20),
  password: zString("password", 10, 100),
  user_type: z.enum(["ADMIN", "USER"]),
});
