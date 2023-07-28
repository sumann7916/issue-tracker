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

  //Create 3 Users with UserType.USER for Test
  //TODO delete later
  const userData = [
    {
      full_name: "User 1",
      username: "user1",
      password: await hashPassword("123456"),
      user_type: UserType.USER,
    },
    {
      full_name: "User 2",
      username: "user2",
      password: await hashPassword("123456"),
      user_type: UserType.USER,
    },
    {
      full_name: "User 3",
      username: "user3",
      password: await hashPassword("123456"),
      user_type: UserType.USER,
    },
  ];

  const users = await db.user.createMany({
    data: userData,
  });

  console.log("Admin User created:", admin);
  console.log("Test Users created:", users);
}

seed();
