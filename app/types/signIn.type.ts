import { z } from "zod";
import { userLoginSchema } from "./z.schema";

export type SignInputType = z.infer<typeof userLoginSchema>;
