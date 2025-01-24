'use client'

import { useState } from 'react';
import { Gift, Send } from 'lucide-react';
import { initialMessages } from '../data/messages';

export default function ChatPanel() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      user: 'You',
      content: message,
      timestamp: 'just now'
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="w-96 bg-black border-l border-neutral-800/50">
      <div className="p-4 border-b border-neutral-800/50 bg-neutral-900/30 backdrop-blur-sm">
        <h2 className="font-bold text-white">Stream Chat</h2>
      </div>
      <div className="h-[calc(100vh-56.25vw-180px)] flex flex-col bg-gradient-to-b from-neutral-900/30 to-black">
        <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-[calc(100vh-190px)]">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-2">
              <div className="flex-shrink-0">
                <img
                  src="/api/placeholder/24/24"
                  alt={msg.user}
                  className="w-6 h-6"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-blue-400">{msg.user}</span>
                  <span className="text-xs text-neutral-500">{msg.timestamp}</span>
                </div>
                <p className="text-neutral-300">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="p-4 border-t border-neutral-800/50 bg-neutral-900/30 backdrop-blur-sm">
          <div className="flex gap-2">
            <Gift className="w-6 h-6 text-blue-400" />
            <div className="flex-1 relative">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send a message"
                className="w-full bg-black px-4 py-2 text-white focus:outline-none border border-neutral-800/50 focus:border-blue-500/50 transition-colors"
              />
              <button type="submit">
                <Send className="absolute right-2 top-2 w-5 h-5 text-neutral-400 hover:text-blue-400 transition-colors" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}