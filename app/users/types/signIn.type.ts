import { z } from "zod";
import { userLoginSchema } from "../../common/types/z.schema";

export type SignInputType = z.infer<typeof userLoginSchema>;
