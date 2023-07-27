import { z } from "zod";
import { AddUserSchema } from "../validators/add-user.validator";

export type AddUserDto = z.infer<typeof AddUserSchema>;
