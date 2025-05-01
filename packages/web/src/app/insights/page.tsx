// packages/web/src/app/insights/page.tsx
import React from 'react'
import { InformationCircleIcon, BookmarkIcon } from '@heroicons/react/24/outline'

type Signal = {
  title: string
  value: string
  change?: string
  footnote?: string
}
const MARKET_SIGNALS: Signal[] = [
  { title: 'Crypto Market Volatility Index', value: '76.4', footnote: '30d avg: 58.2', change: '+12.3%' },
  { title: 'Total DeFi TVL', value: '$42.8B', footnote: '7d change: +$1.4B', change: '+3.5%' },
  { title: 'Bitcoin Dominance', value: '52.3%', footnote: '30d avg: 54.6%', change: '-1.8%' },
  { title: 'Stablecoin Net Flow', value: '+$892M', footnote: '24h vol: $14.2B', change: '+28.4%' },
  { title: 'Network Hash Rate', value: '392 EH/s', footnote: '7d avg: 375 EH/s', change: '+8.2%' },
  { title: 'Derivatives Open Interest', value: '$24.6B', footnote: '24h change: +$1.2B', change: '+5.8%' },
  { title: 'Institutional Flows', value: '+$482M', footnote: 'Weekly net flow', change: '+12.4%' },
  { title: 'Regulatory Activity', value: 'Medium', footnote: 'Last 7 days', change: '+3 events' },
]

const AI_INSIGHTS = [
  { text: 'Your ETH allocation increased in volatility by 17% today. Consider adjusting exposure.', priority: 'Medium priority', time: 'Detected 2 hours ago' },
  { text: 'Stablecoin inflows to exchanges at 3-month high. Potential buying pressure building.', priority: 'Informational', time: 'Detected 4 hours ago' },
  { text: 'Custodial concentration risk: 72% of client BTC held at single provider. Diversification recommended.', priority: 'High priority', time: 'Detected 1 day ago' },
]

const ALERTS = [
  { title: 'Volatility Spike: SOL', desc: 'Solana volatility exceeds 30-day average by 42%. Current allocation: 8.3% of portfolio.', time: 'Apr 30, 2025 · 08:42 AM', action: 'Rebalance recommended' },
  { title: 'Custodian Overconcentration', desc: '72% of client assets held at CoinSecure. Best practice: ≤50% per custodian.', time: 'Apr 29, 2025 · 03:15 PM', action: 'Diversify holdings' },
  { title: 'Regulatory Flag: AVAX', desc: 'SEC classified Avalanche as a security. Current allocation: 4.2%.', time: 'Apr 28, 2025 · 11:23 AM', action: 'Monitor closely' },
  { title: 'Smart Contract Risk: AAVE', desc: 'High utilization rates in AAVE markets. Liquidity risk increased.', time: 'Apr 27, 2025 · 02:37 PM', action: 'Review exposure' },
]

const NEWS = [
  { headline: 'SEC Chair Testifies on Crypto Regulation Framework', source: 'Bloomberg', time: '2h ago', tag: 'SEC' },
  { headline: 'Ethereum Foundation Releases Validator Security Guidelines', source: 'CoinDesk', time: '5h ago', tag: 'ETH' },
  { headline: 'EU MiCA Framework Implementation Timeline Accelerated', source: 'Financial Times', time: '8h ago', tag: 'MiCA' },
  { headline: 'Solana DeFi Protocol Patches Critical Vulnerability', source: 'The Block', time: '10h ago', tag: 'SOL' },
  { headline: 'BlackRock Bitcoin ETF Sees $235M Inflow in Single Day', source: 'WSJ', time: '12h ago', tag: 'BTC' },
  { headline: 'CFTC Issues Guidance on Crypto Derivatives Compliance', source: 'Reuters', time: '1d ago', tag: 'CFTC' },
]

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Insights</h1>
        <p className="mt-1 text-gray-600">Market intelligence and portfolio-specific insights for April 30, 2025</p>
      </div>

      {/* Market Signals + AI Insights */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          {MARKET_SIGNALS.map((s) => (
            <div key={s.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">{s.title}</h3>
                <InformationCircleIcon className="h-4 w-4 text-gray-400" />
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-semibold text-gray-900">{s.value}</span>
                {s.change && (
                  <span
                    className={`text-sm font-medium ${
                      s.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {s.change}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">{s.footnote}</p>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/3 space-y-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-gray-800">AI-Generated Insights</h2>
            <span className="px-2 py-0.5 text-xs font-medium uppercase bg-gray-100 text-gray-500 rounded">Beta</span>
          </div>
          {AI_INSIGHTS.map((i, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-700 leading-snug">{i.text}</p>
              <div className="mt-3 flex justify-between text-xs text-gray-500">
                <span>{i.time}</span>
                <span>{i.priority}</span>
              </div>
            </div>
          ))}
          <p className="text-xs italic text-gray-400">
            AI-generated insights are not financial advice. Always apply professional judgment.
          </p>
        </div>
      </div>

      {/* On-Chain Trends */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-gray-800">On-Chain Trends</h2>
          <div className="space-x-2">
            {['BTC', 'ETH', 'Altcoins', 'Watchlist'].map((f) => (
              <button
                key={f}
                className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              >
                {f}
              </button>
            ))}
            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700">Last 7 days</button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-72 flex items-center justify-center text-gray-300">
          {/* Replace this with your chart component */}
          Chart Placeholder
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Wallets (24h)', value: '1.42M', change: '+5.3%', positive: true },
            { label: 'Exchange Outflows (24h)', value: '$1.83B', change: '+12.7%', positive: true },
            { label: 'Transfer Volume (24h)', value: '$9.4B', change: '-3.2%', positive: false },
            { label: 'Avg. Transaction Fee', value: '$2.48', change: '-8.5%', positive: false },
          ].map((m) => (
            <div key={m.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-500">{m.label}</p>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-xl font-semibold text-gray-900">{m.value}</span>
                <span className={`text-sm font-medium ${m.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {m.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alerts & News */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Alerts */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium text-gray-800">Portfolio-Specific Alerts</h2>
            <span className="text-sm font-medium text-gray-500">3 High Priority</span>
          </div>
          <ul className="space-y-4">
            {ALERTS.map((a, i) => (
              <li key={i} className="pl-4 border-l-4 border-yellow-400">
                <h3 className="text-base font-medium text-gray-700">{a.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{a.desc}</p>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>{a.time}</span>
                  <span className="font-semibold text-gray-700">{a.action}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
              View all alerts &rarr;
            </a>
          </div>
        </div>

        {/* News */}
        <div className="w-full lg:w-1/3 space-y-6 flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-medium text-gray-800">News & Regulatory Feed</h2>
            <div className="flex space-x-2">
              {['All', 'SEC', 'MiCA', 'Portfolio'].map((f) => (
                <button
                  key={f}
                  className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <ul className="flex-1 overflow-y-auto space-y-4">
            {NEWS.map((n, i) => (
              <li key={i} className="relative pb-2 border-b border-gray-100">
                <BookmarkIcon className="absolute top-0 right-0 h-5 w-5 text-gray-300 hover:text-gray-500 cursor-pointer" />
                <h3 className="text-base font-medium text-gray-700">{n.headline}</h3>
                <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                  <span>{n.source}</span>
                  <span>{n.time}</span>
                </div>
                <span className="mt-1 inline-block text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {n.tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
