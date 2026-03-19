export default function GameCard({ deal }) {
  const discount = deal.savings ? Math.round(deal.savings) : 0;
  
  const platformIcons = {
    steam: '🎮',
    playstation: '🎯',
    xbox: '❌',
    nintendo: '🍄',
  };

  return (
    <div className="game-card bg-gaming-card rounded-xl overflow-hidden">
      <div className="relative">
        <img 
          src={deal.thumb || 'https://via.placeholder.com/300x150?text=No+Image'} 
          alt={deal.title}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute top-2 right-2 deal-badge">
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">{platformIcons[deal.platform] || '🎮'}</span>
          <span className="text-xs text-gray-500 uppercase">{deal.platform}</span>
        </div>
        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{deal.title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="price-old">${deal.normalPrice || deal.regularPrice || 'N/A'}</span>
            <span className="price-new ml-2">${deal.salePrice || deal.currentPrice || deal.price || 'N/A'}</span>
          </div>
          <button className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded transition">
            + Alert
          </button>
        </div>
      </div>
    </div>
  );
}
