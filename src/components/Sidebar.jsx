import { useState } from 'react';
import { Home, Radio, Zap, Activity, Settings } from 'lucide-react';
import { followedChannels } from '../data/streams';

const SidebarButton = ({ children, active, ...props }) => (
  <button 
    className={`w-full text-left p-2 relative group ${
      active ? 'text-blue-400 bg-blue-500/10' : 'text-neutral-400 hover:bg-neutral-800'
    }`}
    {...props}
  >
    <div className="flex items-center gap-2">
      {children}
    </div>
    <div className={`absolute left-0 top-0 w-0.5 h-full bg-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform ${
      active ? 'scale-y-100' : ''
    }`} />
  </button>
);

export default function Sidebar() {
  const [activePage, setActivePage] = useState('home');
  const [showSettings, setShowSettings] = useState(false);
  const [expandedChannels, setExpandedChannels] = useState(true);
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  const filteredChannels = showLiveOnly 
    ? followedChannels.filter(c => c.isLive)
    : followedChannels;

  return (
    <aside className="w-60 bg-black h-screen fixed left-0 top-0 flex flex-col border-r border-neutral-800/50">
      <div className="p-4 border-b border-neutral-800/50 bg-neutral-900/30">
        <div className="text-xl font-bold text-white relative">
          <span className="text-blue-400">VOID</span> Streaming
          <div className="absolute -top-1 -right-2 w-2 h-2 bg-blue-500 animate-pulse" />
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1 bg-gradient-to-b from-neutral-900/30 to-black">
        <div className="p-4 space-y-6">
          <button className="w-full bg-blue-500 text-black font-medium p-2 relative group overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Radio className="w-4 h-4" />
              Go Live
            </span>
            <div className="absolute inset-0 bg-blue-400 transform translate-y-full group-hover:translate-y-0 transition-transform" />
          </button>

          <div className="space-y-4">
            <div>
              <div className="text-xs font-medium text-neutral-500 px-2 mb-2">NAVIGATION</div>
              <div className="space-y-1">
                <SidebarButton active={activePage === 'home'} onClick={() => setActivePage('home')}>
                  <Home className="w-4 h-4" />
                  Home
                </SidebarButton>
                <SidebarButton active={activePage === 'trending'} onClick={() => setActivePage('trending')}>
                  <Zap className="w-4 h-4" />
                  Trending
                </SidebarButton>
                <SidebarButton active={activePage === 'following'} onClick={() => setActivePage('following')}>
                  <Activity className="w-4 h-4" />
                  Following
                </SidebarButton>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between px-2 mb-2">
                <div className="text-xs font-medium text-neutral-500">LIVE CHANNELS</div>
                <button 
                  onClick={() => setExpandedChannels(!expandedChannels)}
                  className="text-xs text-neutral-400 hover:text-blue-400"
                >
                  {expandedChannels ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {expandedChannels && (
                <div className="space-y-1">
                  <button 
                    onClick={() => setShowLiveOnly(!showLiveOnly)}
                    className="w-full text-left px-2 py-1 text-xs text-neutral-400 hover:text-blue-400"
                  >
                    {showLiveOnly ? 'Show All' : 'Show Live Only'}
                  </button>
                  
                  {filteredChannels.map((channel, index) => (
                    <SidebarButton key={index}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <img
                              src={`/api/placeholder/24/24`}
                              alt={channel.name}
                              className="w-6 h-6"
                            />
                            {channel.isLive && (
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 animate-pulse" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm">{channel.name}</div>
                            <div className="text-xs text-neutral-500">{channel.game}</div>
                          </div>
                        </div>
                        {channel.isLive && (
                          <div className="text-xs text-neutral-500">{channel.viewers}</div>
                        )}
                      </div>
                    </SidebarButton>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-neutral-800/50 bg-neutral-900/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <img
                src="/api/placeholder/32/32"
                alt="User"
                className="w-8 h-8"
              />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500" />
            </div>
            <span className="text-sm font-medium text-white">CyberUser</span>
          </div>
          <Settings 
            className="w-5 h-5 text-neutral-400 hover:text-blue-400 transition-colors cursor-pointer" 
            onClick={() => setShowSettings(!showSettings)}
          />
        </div>
        
        {showSettings && (
          <div className="mt-4 p-4 bg-black border border-neutral-800/50 rounded">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-neutral-400 block mb-2">Theme</label>
                <select className="w-full bg-neutral-800/50 text-white p-2 rounded">
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
              <button className="w-full bg-red-500/10 text-red-400 p-2 hover:bg-red-500/20 transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}