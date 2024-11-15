import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Post as PostType } from '../types';
import { ArrowBigUp, ArrowBigDown, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  
  const { currentUser, users, editPost, deletePost, vote } = useStore();
  
  const author = users.find(u => u.id === post.authorId);
  const isAuthor = currentUser?.id === post.authorId;
  const userVote = currentUser ? post.votes[currentUser.id] : undefined;

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error('Please fill in all fields');
      return;
    }
    editPost(post.id, title, content);
    setIsEditing(false);
    toast.success('Post updated successfully!');
  };

  const handleDelete = () => {
    deletePost(post.id);
    toast.success('Post deleted successfully!');
  };

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleEdit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => vote(post.id, 'up')}
            className={`p-1 rounded hover:bg-gray-100 ${
              userVote === 'up' ? 'text-orange-500' : 'text-gray-500'
            }`}
            disabled={!currentUser}
          >
            <ArrowBigUp size={24} />
          </button>
          <span className="font-bold text-gray-700">{post.score}</span>
          <button
            onClick={() => vote(post.id, 'down')}
            className={`p-1 rounded hover:bg-gray-100 ${
              userVote === 'down' ? 'text-blue-500' : 'text-gray-500'
            }`}
            disabled={!currentUser}
          >
            <ArrowBigDown size={24} />
          </button>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">{post.title}</h2>
            {isAuthor && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 text-gray-500 hover:text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-600 mb-2">{post.content}</p>
          <div className="text-sm text-gray-500">
            Posted by {author?.username || 'Unknown'} •{' '}
            {new Date(post.createdAt).toLocaleDateString()}
            {post.updatedAt > post.createdAt && ' (edited)'}
          </div>
        </div>
      </div>
    </div>
  );
}