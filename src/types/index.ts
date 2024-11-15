export interface User {
  id: string;
  username: string;
  password: string;
  createdAt: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: number;
  updatedAt: number;
  votes: Record<string, 'up' | 'down'>;
  score: number;
}