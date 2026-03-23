import { betterAuth } from "better-auth";
import { db } from "./db";

export const auth = betterAuth({
  // https://better-auth.com/docs/adapters/sqlite#nodejs-built-in-sqlite-experimental
  database: db,
  emailAndPassword: {
    enabled: true,
  },
});
