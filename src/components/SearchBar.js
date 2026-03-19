'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for games... (e.g., Elden Ring, GTA V)"
          className="w-full bg-gaming-card border border-gray-700 rounded-xl px-6 py-4 pr-24 text-lg focus:outline-none focus:border-gaming-purple transition"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-500 hover:text-white px-3 py-2 transition"
            >
              ✕
            </button>
          )}
          <button
            type="submit"
            className="bg-gaming-purple hover:bg-purple-600 px-6 py-2 rounded-lg font-medium transition"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
