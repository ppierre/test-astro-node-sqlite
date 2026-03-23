import { DatabaseSync } from "node:sqlite";
import type { User } from "./schema";

export const db = new DatabaseSync("sqlite.db");

db.exec(/* sql */ `
CREATE TABLE IF NOT EXISTS "users_table" (
        "id" integer PRIMARY KEY AUTOINCREMENT,
        "name" text NOT NULL,
        "age" integer NOT NULL,
        "email" text NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "posts_table" (
        "id" integer PRIMARY KEY AUTOINCREMENT,
        "title" text NOT NULL,
        "content" text NOT NULL,
        "author_id" integer NOT NULL,
        FOREIGN KEY (author_id) REFERENCES users_table(id)
);
`);

export const queryAllUser = db.prepare(/* sql */ `SELECT * FROM users_table;`);

export function allUser() {
  return queryAllUser.all() as unknown as User[];
}

export const queryUserById = db.prepare(
  /* sql */ `SELECT * FROM users_table WHERE id = :id;`,
);

export function getUserById(id: number) {
  return queryUserById.get({ id }) as unknown as User;
}

export const queryInsertUser = db.prepare(
  /* sql */ `INSERT INTO users_table (name, age, email) VALUES (:name, :age, :email) RETURNING id;`,
);

export function insertUser(user: User) {
  delete user.id;
  // @ts-ignore
  const result = queryInsertUser.get(user) as unknown as {
    id: number;
  };
  return result.id;
}

export const queryUpdateUser = db.prepare(
  /* sql */ `UPDATE users_table SET name = :name, age = :age, email = :email WHERE id = :id;`,
);

export function updateUser(user: User) {
  if (!user.id) {
    throw new Error("User ID is required for update.");
  }
  // @ts-ignore
  queryUpdateUser.run(user);
}

export const queryUserWithPosts = db.prepare(/* sql */ `
SELECT
 (SELECT json_group_array(
  json_object(
   'id', posts_table.id,
   'title', posts_table.title,
   'content', posts_table.content
  )
 ) FROM posts_table WHERE posts_table.author_id = users_table.id) as posts,
 *
FROM users_table WHERE id=:id;
`);

export function getUserWithPosts(id: number) {
  const rawUser = queryUserWithPosts.get({ id });
  const user: User = {
    ...(rawUser as unknown as User),
    posts: JSON.parse(rawUser?.posts as string) as User["posts"],
  };
  return user;
}
