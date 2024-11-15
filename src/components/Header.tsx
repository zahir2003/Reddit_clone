import React from 'react';
import { useStore } from '../store/useStore';
import { LogOut, MessageSquare } from 'lucide-react';

export function Header() {
  const { currentUser, logout } = useStore();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-indigo-600" size={32} />
          <h1 className="text-2xl font-bold text-gray-900">Reddit Clone</h1>
        </div>
        {currentUser && (
          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              Welcome, {currentUser.username}!
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}