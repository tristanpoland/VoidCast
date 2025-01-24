import { useState, useRef, useEffect } from 'react';
import { Radio, Users, Heart, Share2, Volume2, Settings, Maximize2 } from 'lucide-react';

export default function StreamView({ stream }) {
  const [volume, setVolume] = useState(100);
  const [quality, setQuality] = useState('1080p');
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const streamContainerRef = useRef(null);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await streamContainerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const shareOptions = [
    { label: 'Copy Link', action: () => navigator.clipboard.writeText(window.location.href) },
    { label: 'Share to Twitter', action: () => window.open(`https://twitter.com/intent/tweet?text=${stream.title}`) },
    { label: 'Share to Facebook', action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`) }
  ];

  return (
    <div>
      <div 
        ref={streamContainerRef}
        className="relative pt-[56.25%] bg-gradient-to-br from-neutral-900 to-black group max-h-[calc(90vh-50px)]"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Radio className="w-16 h-16 text-blue-500 animate-pulse mb-4" />
            <div className="text-2xl font-bold text-white mb-2">LIVE STREAM</div>
            <div className="text-neutral-400">{quality} • 60 FPS</div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex flex-col gap-4">
            <div className="w-full bg-neutral-800/50 h-1 rounded-full overflow-hidden">
              <div className="w-3/4 bg-blue-500 h-full" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`text-white hover:text-blue-400 transition-colors ${isMuted ? 'text-red-400' : ''}`}
                >
                  <Volume2 className="w-6 h-6" />
                </button>
                {!isMuted && (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-24"
                  />
                )}
                <div className="text-sm text-white">LIVE</div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <Settings className="w-6 h-6" />
                </button>
                <button 
                  onClick={toggleFullscreen}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <Maximize2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {showSettings && (
            <div className="absolute bottom-full mb-2 right-4 bg-black/90 p-4 rounded-lg border border-neutral-800/50 w-64">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-neutral-400 block mb-2">Quality</label>
                  <select 
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full bg-neutral-800/50 text-white p-2 rounded"
                  >
                    <option value="1080p">1080p</option>
                    <option value="720p">720p</option>
                    <option value="480p">480p</option>
                    <option value="360p">360p</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-neutral-400 block mb-2">
                    Stream Stats
                  </label>
                  <button className="w-full bg-neutral-800/50 text-white p-2 rounded text-left hover:bg-neutral-700/50">
                    Show Advanced Stats
                  </button>
                </div>
                <div>
                  <label className="text-sm text-neutral-400 block mb-2">
                    Report Issue
                  </label>
                  <button className="w-full bg-red-500/10 text-red-400 p-2 rounded hover:bg-red-500/20">
                    Report Stream
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-neutral-900/30">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">{stream.title}</h1>
            <p className="text-neutral-400 mt-1">{stream.game}</p>
            <div className="flex items-center gap-2 mt-2">
              <Users className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-400">{stream.viewers} viewers</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 text-neutral-400 hover:text-blue-400 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-neutral-800/50 rounded-lg shadow-lg">
                  {shareOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={option.action}
                      className="w-full px-4 py-2 text-left text-white hover:bg-neutral-800/50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`p-2 transition-colors ${isFollowing ? 'text-red-400 hover:text-red-500' : 'text-neutral-400 hover:text-blue-400'}`}
            >
              <Heart className="w-5 h-5" fill={isFollowing ? 'currentColor' : 'none'} />
            </button>
            <button 
              onClick={() => setIsFollowing(!isFollowing)} 
              className="bg-blue-500 px-6 py-2 text-white font-medium relative group overflow-hidden"
            >
              <span className="relative z-10">{isFollowing ? 'Following' : 'Follow'}</span>
              <div className="absolute inset-0 bg-blue-400 transform translate-y-full group-hover:translate-y-0 transition-transform" />
            </button>
          </div>
        </div>
        
        <div className="flex gap-2">
          {stream.tags.map((tag, index) => (
            <span key={index} className="bg-neutral-800/50 px-2 py-1 text-sm text-blue-400">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 p-4 bg-neutral-800/20 rounded">
          <img
            src="/api/placeholder/64/64"
            alt={stream.streamer}
            className="w-16 h-16 rounded"
          />
          <div>
            <h3 className="font-medium text-white">{stream.streamer}</h3>
            <p className="text-sm text-neutral-400 mt-1">
              Professional {stream.game} player and content creator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}