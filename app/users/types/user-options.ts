import { UserType } from "@prisma/client";

export interface WhereUserOptions {
  username?: string;
  id?: string;
  user_type?: UserType;
}

export interface SelectUserOptions {
  id: boolean;
  username?: boolean;
  full_name?: boolean;
  user_type?: boolean;
}
