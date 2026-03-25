export type User = {
  id?: number;
  name: string;
  age: number;
  email: string;
};

export type UserWithPosts = User & {
  posts: Post[];
};

export type Post = {
  id?: number;
  title: string;
  content: string;
  author_id: number;
};
