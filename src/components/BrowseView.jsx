'use client'

export default function BrowseView({ streams, onStreamSelect }) {
  return (
    <div className="p-4 space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-4">Featured Streams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {streams.map((stream) => (
            <div 
              key={stream.id}
              onClick={() => onStreamSelect(stream)}
              className="bg-neutral-900/50 group cursor-pointer hover:bg-neutral-800/50 transition-colors"
            >
              <div className="relative">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-500 px-2 py-1 text-sm">LIVE</div>
                <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 text-sm">
                  {stream.viewers} viewers
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-3">
                  <img
                    src="/api/placeholder/40/40"
                    alt={stream.streamer}
                    className="w-10 h-10"
                  />
                  <div>
                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                      {stream.title}
                    </h3>
                    <p className="text-sm text-neutral-400">{stream.streamer}</p>
                    <p className="text-sm text-neutral-400">{stream.game}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  {stream.tags.map((tag, index) => (
                    <span key={index} className="bg-neutral-800/50 px-2 py-1 text-xs text-blue-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}