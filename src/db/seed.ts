import { allUser, insertUser } from "./index";
import type { User } from "./schema";

const user1: User = {
  name: "david",
  age: 40,
  email: "david@example.com",
};
const user2: User = {
  name: "alice",
  age: 30,
  email: "alice@example.com",
};

insertUser(user1);
insertUser(user2);

const users = allUser();
console.log("Getting all users from the database: ", users);
