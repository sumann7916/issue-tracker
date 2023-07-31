import { UserType } from "@prisma/client";

export const userTypeList = Object.values(UserType);
export type UserNameAndId = {
  id: string;
  user_type: UserType;
};
