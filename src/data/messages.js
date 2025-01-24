export const initialMessages = [
    {
      id: 1,
      user: 'CyberFan',
      content: 'Amazing stream!',
      timestamp: '2m ago',
      userType: 'viewer'
    },
    {
      id: 2,
      user: 'NeonKnight',
      content: 'That play was insane',
      timestamp: '1m ago',
      userType: 'subscriber',
      badges: ['1-Year']
    },
    {
      id: 3,
      user: 'QuantumQueen',
      content: 'GG',
      timestamp: 'just now',
      userType: 'moderator',
      badges: ['Mod', 'VIP']
    },
    {
      id: 4,
      user: 'CyberPro',
      content: 'Thanks everyone for watching!',
      timestamp: 'just now',
      userType: 'streamer',
      badges: ['Verified']
    }
  ];
  
  export const userBadges = {
    subscriber: {
      '1-Year': { label: '1 Year', color: 'text-purple-400' },
      '2-Year': { label: '2 Years', color: 'text-purple-500' },
      '3-Year': { label: '3 Years', color: 'text-purple-600' }
    },
    special: {
      'Mod': { label: 'Moderator', color: 'text-green-400' },
      'VIP': { label: 'VIP', color: 'text-pink-400' },
      'Verified': { label: 'Verified', color: 'text-blue-400' }
    }
  };