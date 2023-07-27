import { UserType } from "@prisma/client";

export interface UserDetail {
  full_name: string;
  username: string;
  user_type: UserType;
}

export interface UserIdAndUsernameType {
  username: string;
  id: string;
}
