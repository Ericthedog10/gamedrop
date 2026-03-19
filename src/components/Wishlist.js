'use client';

import { useState, useEffect } from 'react';

export default function Wishlist({ onGameSelect }) {
  const [wishlist, setWishlist] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('gamedrop_wishlist');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const addToWishlist = (game) => {
    const newWishlist = [...wishlist, { ...game, targetPrice: targetPrice || null }];
    setWishlist(newWishlist);
    localStorage.setItem('gamedrop_wishlist', JSON.stringify(newWishlist));
    setShowForm(false);
    setTargetPrice('');
  };

  const removeFromWishlist = (gameId) => {
    const newWishlist = wishlist.filter(g => g.id !== gameId);
    setWishlist(newWishlist);
    localStorage.setItem('gamedrop_wishlist', JSON.stringify(newWishlist));
  };

  return (
    <section className="mt-12 bg-gaming-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          ❤️ Wishlist ({wishlist.length}/20)
        </h2>
        {wishlist.length < 20 && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gaming-purple hover:bg-purple-600 px-4 py-2 rounded-lg font-medium transition"
          >
            + Add Game
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-gray-900 rounded-lg">
          <p className="text-gray-400 mb-2">Enter game name to track:</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Game name..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-gaming-purple"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  addToWishlist({ id: Date.now(), title: e.target.value, platform: 'steam' });
                }
              }}
            />
            <input
              type="number"
              placeholder="Alert below $"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className="w-32 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-gaming-purple"
            />
          </div>
        </div>
      )}

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No games in wishlist yet. Add some to track prices!
        </p>
      ) : (
        <div className="space-y-3">
          {wishlist.map((game) => (
            <div key={game.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
              <div className="flex items-center gap-4">
                {game.thumb && (
                  <img src={game.thumb} alt="" className="w-12 h-12 rounded object-cover" />
                )}
                <div>
                  <h3 className="font-medium">{game.title}</h3>
                  {game.targetPrice && (
                    <p className="text-sm text-green-400">Alert below ${game.targetPrice}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeFromWishlist(game.id)}
                className="text-gray-500 hover:text-red-400 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {wishlist.length >= 20 && (
        <p className="text-center mt-4 text-gray-400">
          Wishlist full!{' '}
          <button className="text-gaming-purple hover:underline">Upgrade to Pro</button> for unlimited.
        </p>
      )}
    </section>
  );
}
