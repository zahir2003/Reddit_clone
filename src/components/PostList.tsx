import React from 'react';
import { useStore } from '../store/useStore';
import { Post } from './Post';

export function PostList() {
  const { posts } = useStore();
  
  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No posts yet. Be the first to create one!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}