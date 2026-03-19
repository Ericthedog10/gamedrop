import './globals.css';

export const metadata = {
  title: 'GameDrop - Never Miss a Game Deal',
  description: 'Track game deals across Steam, PlayStation, Xbox, and Nintendo. Get alerts when prices drop.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gaming-dark">
        <nav className="border-b border-gray-800 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <span className="text-xl font-bold gradient-text">GameDrop</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#deals" className="text-gray-400 hover:text-white transition">Deals</a>
              <a href="#alerts" className="text-gray-400 hover:text-white transition">Alerts</a>
              <a href="#about" className="text-gray-400 hover:text-white transition">About</a>
              <button className="bg-gaming-purple hover:bg-purple-600 px-4 py-2 rounded-lg font-medium transition">
                Get Pro
              </button>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t border-gray-800 px-6 py-8 mt-20">
          <div className="max-w-7xl mx-auto text-center text-gray-500">
            <p>© 2026 GameDrop. Track game deals across all platforms.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
