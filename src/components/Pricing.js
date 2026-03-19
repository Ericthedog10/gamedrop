'use client';

import { useState } from 'react';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      '✓ Unlimited search',
      '✓ 20 price alerts',
      '✓ 1 wishlist (20 games)',
      '✓ Deal notifications on site',
      '✗ Telegram bot',
      '✗ Discord alerts',
      '✗ Affiliate cashback',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$3',
    period: '/month',
    popular: true,
    features: [
      '✓ Everything in Free',
      '✓ Unlimited alerts',
      '✓ Unlimited wishlists',
      '✓ Telegram bot integration',
      '✓ Discord webhook alerts',
      '✓ Early access to deals',
      '✓ 2% cashback on purchases',
    ],
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 gradient-text">Simple Pricing</h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Start free, upgrade when you need more power.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-b from-purple-900/50 to-gaming-card border-2 border-gaming-purple'
                  : 'bg-gaming-card'
              }`}
            >
              {plan.popular && (
                <span className="inline-block bg-gaming-purple text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  MOST POPULAR
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className={feature.startsWith('✗') ? 'text-gray-500' : ''}>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-bold transition ${
                  plan.popular
                    ? 'bg-gaming-purple hover:bg-purple-600'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {plan.id === 'free' ? 'Get Started' : 'Start 7-Day Free Trial'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
