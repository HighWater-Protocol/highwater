"use client";
import React, { useState, useRef, useEffect } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { MARKET_SIGNALS } from '../data/mockDashboard';

const DESCRIPTIONS: Record<string, string> = {
  'Crypto Market Volatility Index': 'Measures the overall volatility of the cryptocurrency market over the last 30 days.',
  'Total DeFi TVL': 'Total value locked in decentralized finance protocols across all chains.',
  'Bitcoin Dominance': 'Percentage of total crypto market cap represented by Bitcoin.',
  'Stablecoin Net Flow': 'Net inflow or outflow of stablecoins across major exchanges over the last 24h.',
  'Network Hash Rate': 'Aggregate computational power securing proof-of-work blockchains. Higher hash rates indicate greater security and miner participation.',
  'Derivatives Open Interest': 'Total value of outstanding derivative contracts (futures, options) in the crypto market. Rising open interest can signal increased trading activity or speculation.',
  'Institutional Flows': 'Net inflow or outflow of funds from institutional investors, such as hedge funds and asset managers, over the past week.',
  'Regulatory Activity': 'Tracks the number and severity of regulatory events or actions impacting the crypto market in the last 7 days.',
};

export default function MarketSignals() {
  const [open, setOpen] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
      {MARKET_SIGNALS.map((s) => (
        <div key={s.title} className="relative bg-white rounded-lg shadow-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">{s.title}</h3>
            <button
              className="ml-2 p-1 rounded-full hover:bg-gray-100"
              onClick={() => setOpen(open === s.title ? null : s.title)}
              aria-label={`Show description for ${s.title}`}
            >
              <InformationCircleIcon className="h-4 w-4 text-gray-400 hover:text-blue-500" />
            </button>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-semibold text-gray-900">{s.value}</span>
            {s.change && (
              <span
                className={`text-sm font-medium ${s.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
              >
                {s.change}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500">{s.footnote}</p>
          {open === s.title && (
            <div
              ref={popoverRef}
              className="absolute z-20 top-2 right-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-xs text-gray-700 w-64"
            >
              <div className="font-semibold mb-1">{s.title}</div>
              <div>{DESCRIPTIONS[s.title]}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
