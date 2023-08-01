import { z } from "zod";
import { userLoginSchema } from "../../common/types/z.schema";
import { UserType } from "@prisma/client";
import { AddUserSchema } from "../validators/add-user.validator";


export type SignInputType = z.infer<typeof userLoginSchema>;

export type AddUserDto = z.infer<typeof AddUserSchema>;

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
  
export const userTypeList = Object.values(UserType);

export type UserNameAndId = {
  id: string;
  user_type: UserType;
};

export interface UserDetail {
    full_name: string;
    username: string;
    user_type: UserType;
  }
  
  export interface UserIdAndUsername {
    username: string;
    id: string;
  }
  