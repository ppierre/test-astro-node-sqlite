-- SQLite
CREATE TABLE IF NOT EXISTS "users_table" (
        "id" integer PRIMARY KEY AUTOINCREMENT,
        "name" text NOT NULL,
        "age" integer NOT NULL,
        "email" text NOT NULL UNIQUE
);

SELECT * FROM users_table WHERE id = :id;

SELECT * FROM users_table;

-- https://sqlite.org/cli.html#sql_parameters
-- besoin de quoter dans DataGrip
INSERT INTO users_table (name, age, email) VALUES (:name, :age, :email) RETURNING id;

CREATE TABLE IF NOT EXISTS "posts_table" (
        "id" integer PRIMARY KEY AUTOINCREMENT,
        "title" text NOT NULL,
        "content" text NOT NULL,
        "author_id" integer NOT NULL,
        FOREIGN KEY (author_id) REFERENCES users_table(id)
);

INSERT INTO posts_table (title, content, author_id) VALUES ('First Post', 'This is the content of the first post.', 1),
('Second Post', 'This is the content of the second post.', 1),
('Third Post', 'This is the content of the third post.', 2)
;

SELECT
 *
FROM users_table
LEFT OUTER JOIN posts_table ON users_table.id = posts_table.author_id
;

SELECT 
 count(posts_table.id) as post_count,
json_group_array(
  json_object(
   'id', posts_table.id,
   'title', posts_table.title,
   'content', posts_table.content
  )
 ) as posts,
 * 
FROM users_table 
LEFT OUTER JOIN posts_table ON users_table.id = posts_table.author_id
GROUP BY users_table.id;

SELECT 
 (SELECT json_group_array(
  json_object(
   'id', posts_table.id,
   'title', posts_table.title,
   'content', posts_table.content
  )
 ) FROM posts_table WHERE posts_table.author_id = users_table.id) as posts,
 * 
FROM users_table;

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
