import { User } from "../models/user-models.js";
import bcrypt from "bcrypt";

export const seedUsers = async () => {
  await User.bulkCreate([
    {
      username: "admin",
      email: "admin@admin.com",
      password: await bcrypt.hash("admin", 10),
    },
    {
      username: "firstUser",
      email: "first@thisguy.com",
      password: await bcrypt.hash("first_password", 10),
    },
  ]);
};

/* import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    {
        username: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
    },
    {
        username: 'firstUser',
        email: 'first@thisguy.com',
        password: 'first_password',
    },
  ], { individualHooks: true });
}; */