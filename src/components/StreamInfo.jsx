export function StreamInfo({ stream }) {
    return (
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">{stream.title}</h1>
            <p className="text-neutral-400 mt-1">{stream.game}</p>
          </div>
          <button className="bg-blue-500 px-6 py-2 text-white font-medium relative group overflow-hidden">
            <span className="relative z-10">Follow</span>
            <div className="absolute inset-0 bg-blue-400 transform translate-y-full group-hover:translate-y-0 transition-transform" />
          </button>
        </div>
        <div className="flex gap-2">
          {stream.tags.map((tag, index) => (
            <span key={index} className="bg-neutral-800/50 px-2 py-1 text-sm text-blue-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }