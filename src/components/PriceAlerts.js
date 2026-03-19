'use client';

import { useState, useEffect } from 'react';

export default function PriceAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('gamedrop_alerts');
    if (saved) setAlerts(JSON.parse(saved));
  }, []);

  const addAlert = (game, targetPrice) => {
    if (alerts.length >= 20) return;
    
    const newAlert = {
      id: Date.now(),
      game: game.title,
      targetPrice,
      createdAt: new Date().toISOString(),
      triggered: false,
    };
    
    const newAlerts = [...alerts, newAlert];
    setAlerts(newAlerts);
    localStorage.setItem('gamedrop_alerts', JSON.stringify(newAlerts));
  };

  const removeAlert = (id) => {
    const newAlerts = alerts.filter(a => a.id !== id);
    setAlerts(newAlerts);
    localStorage.setItem('gamedrop_alerts', JSON.stringify(newAlerts));
  };

  return (
    <section id="alerts" className="mt-12">
      <div className="bg-gaming-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            🔔 Price Alerts ({alerts.length}/20)
          </h2>
        </div>

        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">No alerts set</p>
            <p className="text-sm text-gray-600">
              Search for a game and click "+ Alert" to get notified when the price drops.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 bg-gray-900 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{alert.game}</h3>
                  <p className="text-sm text-green-400">
                    Alert when below ${alert.targetPrice}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-2 py-1 rounded ${
                    alert.triggered 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-800 text-gray-500'
                  }`}>
                    {alert.triggered ? '✓ Triggered' : 'Watching'}
                  </span>
                  <button
                    onClick={() => removeAlert(alert.id)}
                    className="text-gray-500 hover:text-red-400 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {alerts.length >= 20 && (
          <p className="text-center mt-4 text-gray-400">
            Max alerts reached.{' '}
            <button className="text-gaming-purple hover:underline">Upgrade to Pro</button> for unlimited.
          </p>
        )}
      </div>
    </section>
  );
}
