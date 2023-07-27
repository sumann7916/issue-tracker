import { PrismaClient, UserType } from "@prisma/client";
import { hashPassword } from "../app/utils/login.utils";

const db = new PrismaClient();

async function seed() {
  //Creating admin user
  const full_name = process.env.ADMIN_FULL_NAME ?? "admin";
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const passwordString = process.env.ADMIN_PASSWORD ?? "secret@123";
  const user_type = UserType.ADMIN;
  const password = await hashPassword(passwordString);

  const data = {
    full_name,
    username,
    password,
    user_type,
  };

  const admin = await db.user.create({
    data,
  });
}

seed();
