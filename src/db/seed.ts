import { db } from "./index";
import * as schema from "./schema";

const user: typeof schema.usersTable.$inferInsert = {
  name: "John",
  age: 30,
  email: "john@example.com",
};

await db.insert(schema.usersTable).values(user);

const users = await db.select().from(schema.usersTable);
console.log("Getting all users from the database: ", users);
