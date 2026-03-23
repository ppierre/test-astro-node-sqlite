export interface User {
  id?: number;
  name: string;
  age: number;
  email: string;
  posts?: Post[];
}

export interface Post {
  id?: number;
  title: string;
  content: string;
  author_id: number;
}
