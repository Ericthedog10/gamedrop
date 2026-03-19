export default function FeaturedDeals() {
  const featured = [
    {
      id: 'featured-1',
      title: 'Steam Summer Sale',
      description: 'Up to 90% off on thousands of titles',
      icon: '🔥',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      id: 'featured-2',
      title: 'PlayStation Deals',
      description: 'PSN Flash Sales happening now',
      icon: '🎯',
      gradient: 'from-blue-500 to-blue-700',
    },
    {
      id: 'featured-3',
      title: 'Xbox Game Pass',
      description: 'Best value in gaming just got better',
      icon: '❌',
      gradient: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((item) => (
          <div 
            key={item.id}
            className={`bg-gradient-to-r ${item.gradient} p-6 rounded-xl cursor-pointer hover:scale-105 transition-transform`}
          >
            <span className="text-3xl mb-3 block">{item.icon}</span>
            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
            <p className="text-sm opacity-90">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
