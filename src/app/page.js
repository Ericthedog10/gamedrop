'use client';

import { useState, useEffect } from 'react';
import GameCard from '@/components/GameCard';
import SearchBar from '@/components/SearchBar';
import PlatformFilter from '@/components/PlatformFilter';
import FeaturedDeals from '@/components/FeaturedDeals';

export default function Home() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const res = await fetch('/api/deals');
      const data = await res.json();
      setDeals(data);
    } catch (error) {
      console.error('Failed to fetch deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setDeals(data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    } else if (query.length === 0) {
      fetchDeals();
    }
  };

  const filteredDeals = deals.filter(deal => {
    const platformMatch = selectedPlatform === 'all' || deal.platform === selectedPlatform;
    return platformMatch;
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="gradient-text">Never Miss a Deal</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Track game prices across Steam, PlayStation, Xbox, and Nintendo.
          Set alerts and save money on your favorite games.
        </p>
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Featured Deals */}
      <FeaturedDeals />

      {/* Platform Filter */}
      <section className="mb-8">
        <PlatformFilter 
          selected={selectedPlatform} 
          onChange={setSelectedPlatform} 
        />
      </section>

      {/* Deals Grid */}
      <section id="deals">
        <h2 className="text-2xl font-bold mb-6">
          {searchQuery ? `Results for "${searchQuery}"` : 'Hot Deals'}
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gaming-card rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        ) : filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDeals.map((deal) => (
              <GameCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No deals found. Try a different search.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="mt-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Never Pay Full Price Again</h2>
        <p className="text-gray-400 mb-6 max-w-lg mx-auto">
          Join thousands of gamers who never miss a deal. Set price alerts and get notified when your wishlist games go on sale.
        </p>
        <button className="bg-white text-gaming-dark px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
          Start Tracking for Free
        </button>
      </section>
    </main>
  );
}
