'use client';

const platforms = [
  { id: 'all', name: 'All', icon: '🌐' },
  { id: 'steam', name: 'Steam', icon: '🎮' },
  { id: 'playstation', name: 'PlayStation', icon: '🎯' },
  { id: 'xbox', name: 'Xbox', icon: '❌' },
  { id: 'nintendo', name: 'Nintendo', icon: '🍄' },
];

export default function PlatformFilter({ selected, onChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-gray-500 mr-2">Platform:</span>
      {platforms.map((platform) => (
        <button
          key={platform.id}
          onClick={() => onChange(platform.id)}
          className={`platform-badge flex items-center gap-2 transition ${
            selected === platform.id 
              ? 'bg-gaming-purple text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <span>{platform.icon}</span>
          <span>{platform.name}</span>
        </button>
      ))}
    </div>
  );
}
