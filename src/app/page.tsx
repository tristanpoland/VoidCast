"use client"
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { StreamInfo } from '@/components/StreamInfo';
import TopNav from '@/components/TopNav';
import StreamView from '@/components/StreamView';
import ChatPanel from '@/components/ChatPanel';
import BrowseView from '@/components/BrowseView';
import { streams } from '@/data/streams';

export default function StreamingApp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const streamId = searchParams.get('stream');
  
  const [showChat, setShowChat] = useState(true);
  const [selectedStream, setSelectedStream] = useState(null);

  useEffect(() => {
    if (streamId) {
      const stream = streams.find(s => s.id === parseInt(streamId));
      setSelectedStream(stream);
    }
  }, [streamId]);

  const handleStreamSelect = (stream) => {
    setSelectedStream(stream);
    router.push(`/?stream=${stream.id}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />
      <TopNav />
      <div className="ml-60 pt-16">
        {selectedStream ? (
          <div className="flex">
            <div className="flex-1">
              <StreamView stream={selectedStream} />
              <div className="p-4 bg-neutral-900/30">
                <StreamInfo stream={selectedStream} />
              </div>
            </div>
            {showChat && <ChatPanel />}
          </div>
        ) : (
          <BrowseView onStreamSelect={handleStreamSelect} streams={streams} />
        )}
      </div>
    </div>
  );
}
