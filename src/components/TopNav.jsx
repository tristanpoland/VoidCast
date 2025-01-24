'use client'

import { Search, Bell, Crown } from 'lucide-react';

export default function TopNav() {
  return (
    <nav className="fixed top-0 left-60 right-0 bg-black/50 backdrop-blur-sm border-b border-neutral-800/50 z-40">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              placeholder="Search streams..."
              className="bg-neutral-900/50 pl-10 pr-4 py-2 w-64 focus:outline-none text-white border border-neutral-800/50 focus:border-blue-500/50 transition-colors"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" />
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 focus-within:opacity-100 pointer-events-none transition-opacity" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Crown className="w-6 h-6 text-blue-400" />
          <div className="relative">
            <Bell className="w-6 h-6 text-neutral-400 hover:text-blue-400 transition-colors cursor-pointer" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 animate-pulse" />
          </div>
        </div>
      </div>
    </nav>
  );
}