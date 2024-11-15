import { create } from 'zustand';
import { User, Post } from '../types';
import { persist } from 'zustand/middleware';

interface Store {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
  createPost: (title: string, content: string) => void;
  editPost: (postId: string, title: string, content: string) => void;
  deletePost: (postId: string) => void;
  vote: (postId: string, voteType: 'up' | 'down') => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],
      posts: [],
      
      login: (username, password) => {
        const user = get().users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          set({ currentUser: user });
          return true;
        }
        return false;
      },

      register: (username, password) => {
        if (get().users.some((u) => u.username === username)) {
          return false;
        }
        const newUser: User = {
          id: crypto.randomUUID(),
          username,
          password,
          createdAt: Date.now(),
        };
        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser,
        }));
        return true;
      },

      logout: () => set({ currentUser: null }),

      createPost: (title, content) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;

        const newPost: Post = {
          id: crypto.randomUUID(),
          title,
          content,
          authorId: currentUser.id,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          votes: {},
          score: 0,
        };
        set((state) => ({ posts: [newPost, ...state.posts] }));
      },

      editPost: (postId, title, content) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? { ...post, title, content, updatedAt: Date.now() }
              : post
          ),
        }));
      },

      deletePost: (postId) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== postId),
        }));
      },

      vote: (postId, voteType) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;

        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id !== postId) return post;

            const votes = { ...post.votes };
            const previousVote = votes[currentUser.id];

            if (previousVote === voteType) {
              delete votes[currentUser.id];
            } else {
              votes[currentUser.id] = voteType;
            }

            const score = Object.values(votes).reduce(
              (acc, vote) => acc + (vote === 'up' ? 1 : -1),
              0
            );

            return { ...post, votes, score };
          }),
        }));
      },
    }),
    {
      name: 'reddit-clone-storage',
    }
  )
);