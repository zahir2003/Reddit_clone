import React from 'react';
import { useStore } from './store/useStore';
import { Header } from './components/Header';
import { Auth } from './components/Auth';
import { CreatePost } from './components/CreatePost';
import { PostList } from './components/PostList';
import { Toaster } from 'react-hot-toast';

function App() {
  const { currentUser } = useStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {!currentUser ? (
          <Auth />
        ) : (
          <div className="space-y-6">
            <CreatePost />
            <PostList />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;