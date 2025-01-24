// app/data/streams.js
export const streams = [
    { 
      id: 1, 
      title: 'Cyberpunk Championship',
      game: 'Cyberpunk 2077',
      streamer: 'CyberPro',
      viewers: '125K',
      tags: ['Esports', 'FPS', 'English'],
      thumbnail: '/api/placeholder/640/360',
      description: 'Professional Cyberpunk 2077 player competing in the world championship',
      startedAt: '2024-01-24T10:00:00Z',
      category: 'Gaming',
      language: 'English',
      mature: false
    },
    { 
      id: 2,
      title: 'Late Night Neon Racing',
      game: 'Neon Drive',
      streamer: 'NeonRider',
      viewers: '82K',
      tags: ['Racing', 'Chill', 'Music'],
      thumbnail: '/api/placeholder/640/360',
      description: 'Relaxing night drives with synthwave music',
      startedAt: '2024-01-24T08:30:00Z',
      category: 'Racing',
      language: 'English',
      mature: false
    },
    { 
      id: 3,
      title: 'VR Exploration',
      game: 'VR Chat',
      streamer: 'VRMaster',
      viewers: '45K',
      tags: ['VR', 'Social', 'English'],
      thumbnail: '/api/placeholder/640/360',
      description: 'Exploring virtual worlds and meeting new people',
      startedAt: '2024-01-24T09:15:00Z',
      category: 'VR',
      language: 'English',
      mature: false
    }
  ];
  
  export const followedChannels = [
    { name: 'CyberPro', game: 'Cyberpunk 2077', viewers: '125K', isLive: true },
    { name: 'NeonRider', game: 'Neon Racing', viewers: '82K', isLive: true },
    { name: 'VRMaster', game: 'VR Chat', viewers: '45K', isLive: false },
    { name: 'TechGuru', game: 'Science & Tech', viewers: '33K', isLive: true },
    { name: 'QuantumPlayer', game: 'Quantum Break', viewers: '28K', isLive: true }
  ];
  
  export const categories = [
    { id: 1, name: 'Gaming', viewers: '2.1M' },
    { id: 2, name: 'IRL', viewers: '850K' },
    { id: 3, name: 'Esports', viewers: '750K' },
    { id: 4, name: 'Music', viewers: '450K' },
    { id: 5, name: 'Creative', viewers: '380K' }
  ];